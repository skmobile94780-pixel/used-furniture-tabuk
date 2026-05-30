/*
  # Fix RLS Security Policies

  This migration hardens all RLS policies across the database to eliminate
  overly permissive rules and restrict GraphQL schema exposure.

  ## Changes by table:

  ### 1. contact_messages
    - Replace open INSERT policy with one that enforces non-empty required fields
    - Revoke SELECT from anon (contact submissions are admin-only data)
    - Add SELECT restricted to authenticated admin users

  ### 2. contact_requests
    - Replace open INSERT policy with one that enforces non-empty required fields
    - Revoke SELECT from anon (contact submissions are admin-only data)
    - Add SELECT restricted to authenticated admin users

  ### 3. site_settings
    - Keep public SELECT (needed for site config on frontend)
    - Replace open INSERT/UPDATE/DELETE with admin-only policies using app_metadata check

  ### 4. social_links
    - Keep public SELECT for active links (needed for footer)
    - Replace open INSERT/UPDATE/DELETE with admin-only policies using app_metadata check

  ### 5. tasks
    - Not used by the application
    - Replace all open policies with authenticated-only + ownership policies

  ### 6. blog_posts (GraphQL visibility)
    - Revoke SELECT from anon at the GRANT level since the RLS policy already
      restricts access appropriately, but re-grant since blog posts are public content

  ## Security notes
    - Admin write operations require `app_metadata.is_admin = true` on the user's JWT
    - Contact form submissions validate that required fields are non-empty
    - Anonymous users can no longer read contact_messages, contact_requests, or tasks
    - To grant admin access, set app_metadata on a user:
      UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"is_admin": true}'
      WHERE id = '<user-uuid>';
*/

-- ============================================================
-- Helper: admin check function
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean,
    false
  );
$$;

-- ============================================================
-- 1. contact_messages
-- ============================================================

-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Public can submit contact messages" ON public.contact_messages;

-- New INSERT: anon can insert but must provide non-empty name, phone, message
CREATE POLICY "Anon can submit contact messages with required fields"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0
    AND length(trim(phone)) > 0
    AND length(trim(message)) > 0
  );

-- Revoke SELECT from anon so it's not visible in GraphQL to anonymous
REVOKE SELECT ON public.contact_messages FROM anon;

-- Only admin can read contact messages
DROP POLICY IF EXISTS "Admin can read contact messages" ON public.contact_messages;
CREATE POLICY "Admin can read contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- 2. contact_requests
-- ============================================================

DROP POLICY IF EXISTS "Anyone can submit a contact request" ON public.contact_requests;

CREATE POLICY "Anon can submit contact requests with required fields"
  ON public.contact_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0
    AND length(trim(phone)) > 0
    AND length(trim(message)) > 0
  );

-- Revoke SELECT from anon
REVOKE SELECT ON public.contact_requests FROM anon;

-- Only admin can read contact requests
DROP POLICY IF EXISTS "Admin can read contact requests" ON public.contact_requests;
CREATE POLICY "Admin can read contact requests"
  ON public.contact_requests
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- 3. site_settings
-- ============================================================

-- Keep the public SELECT as-is (needed for frontend to load phone/whatsapp config)
-- But tighten write policies to admin-only

DROP POLICY IF EXISTS "Authenticated users can insert site settings" ON public.site_settings;
CREATE POLICY "Admin can insert site settings"
  ON public.site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can update site settings" ON public.site_settings;
CREATE POLICY "Admin can update site settings"
  ON public.site_settings
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can delete site settings" ON public.site_settings;
CREATE POLICY "Admin can delete site settings"
  ON public.site_settings
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- 4. social_links
-- ============================================================

-- Keep the public SELECT (active links only) as-is

DROP POLICY IF EXISTS "Authenticated users can insert social links" ON public.social_links;
CREATE POLICY "Admin can insert social links"
  ON public.social_links
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can update social links" ON public.social_links;
CREATE POLICY "Admin can update social links"
  ON public.social_links
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can delete social links" ON public.social_links;
CREATE POLICY "Admin can delete social links"
  ON public.social_links
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- 5. tasks (not used by the app, lock down fully)
-- ============================================================

DROP POLICY IF EXISTS "Anyone can insert tasks" ON public.tasks;
DROP POLICY IF EXISTS "Anyone can view tasks" ON public.tasks;
DROP POLICY IF EXISTS "Anyone can update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Anyone can delete tasks" ON public.tasks;

-- Revoke all access from anon
REVOKE ALL ON public.tasks FROM anon;

-- Only admin can access tasks
CREATE POLICY "Admin can view tasks"
  ON public.tasks
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert tasks"
  ON public.tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update tasks"
  ON public.tasks
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete tasks"
  ON public.tasks
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- 6. Revoke anon SELECT from private tables for GraphQL schema
-- ============================================================

-- contact_messages and contact_requests already revoked above
-- tasks already revoked above

-- blog_posts: public content, anon SELECT is intentional - no change needed
-- site_settings: public config, anon SELECT is intentional - no change needed
-- social_links: public social links, anon SELECT is intentional - no change needed
