/*
  # Inline admin check and drop is_admin() function

  Eliminates the public.is_admin() function entirely to resolve:
    - Function search_path mutable warning
    - Public/authenticated can execute SECURITY DEFINER function via RPC

  The admin check `(auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true`
  is inlined directly into each RLS policy that previously called is_admin().

  ## Affected tables
    - site_settings: INSERT, UPDATE, DELETE policies
    - social_links: INSERT, UPDATE, DELETE policies
    - tasks: INSERT, UPDATE, DELETE policies

  ## No functional change
    - The authorization logic is identical, just inlined
    - Public read policies for site_settings, social_links, blog_posts are unchanged
*/

-- Inline admin check expression used in all policies below
-- Expression: coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false)

-- ============================================================
-- site_settings
-- ============================================================

DROP POLICY IF EXISTS "Admin can insert site settings" ON public.site_settings;
CREATE POLICY "Admin can insert site settings"
  ON public.site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false));

DROP POLICY IF EXISTS "Admin can update site settings" ON public.site_settings;
CREATE POLICY "Admin can update site settings"
  ON public.site_settings
  FOR UPDATE
  TO authenticated
  USING (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false))
  WITH CHECK (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false));

DROP POLICY IF EXISTS "Admin can delete site settings" ON public.site_settings;
CREATE POLICY "Admin can delete site settings"
  ON public.site_settings
  FOR DELETE
  TO authenticated
  USING (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false));

-- ============================================================
-- social_links
-- ============================================================

DROP POLICY IF EXISTS "Admin can insert social links" ON public.social_links;
CREATE POLICY "Admin can insert social links"
  ON public.social_links
  FOR INSERT
  TO authenticated
  WITH CHECK (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false));

DROP POLICY IF EXISTS "Admin can update social links" ON public.social_links;
CREATE POLICY "Admin can update social links"
  ON public.social_links
  FOR UPDATE
  TO authenticated
  USING (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false))
  WITH CHECK (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false));

DROP POLICY IF EXISTS "Admin can delete social links" ON public.social_links;
CREATE POLICY "Admin can delete social links"
  ON public.social_links
  FOR DELETE
  TO authenticated
  USING (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false));

-- ============================================================
-- tasks
-- ============================================================

DROP POLICY IF EXISTS "Admin can insert tasks" ON public.tasks;
CREATE POLICY "Admin can insert tasks"
  ON public.tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false));

DROP POLICY IF EXISTS "Admin can update tasks" ON public.tasks;
CREATE POLICY "Admin can update tasks"
  ON public.tasks
  FOR UPDATE
  TO authenticated
  USING (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false))
  WITH CHECK (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false));

DROP POLICY IF EXISTS "Admin can delete tasks" ON public.tasks;
CREATE POLICY "Admin can delete tasks"
  ON public.tasks
  FOR DELETE
  TO authenticated
  USING (coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false));

-- ============================================================
-- Drop the function entirely
-- ============================================================

DROP FUNCTION IF EXISTS public.is_admin();
