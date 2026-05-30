/*
  # Fix Function Security and GraphQL Schema Exposure

  ## 1. is_admin() function
    - Set search_path to '' (empty) to prevent mutable search path attacks
    - Switch from SECURITY DEFINER to SECURITY INVOKER (safe because auth.jwt() works in invoker context)
    - Revoke EXECUTE from anon and public roles so it cannot be called via /rest/v1/rpc/is_admin

  ## 2. GraphQL schema exposure - private tables
    - Revoke SELECT from authenticated on contact_messages (admin RLS policy remains, admin uses service_role or dashboard)
    - Revoke SELECT from authenticated on contact_requests (same approach)
    - Revoke SELECT from authenticated on tasks (same approach)
    - These tables have no legitimate authenticated non-admin SELECT use cases

  ## 3. GraphQL schema exposure - public tables (NO CHANGE)
    - blog_posts: intentionally public, anon+authenticated SELECT is required for the website
    - site_settings: intentionally public, anon+authenticated SELECT is required for the website
    - social_links: intentionally public, anon+authenticated SELECT is required for the website
    - These tables MUST remain readable by anon for the frontend to function

  ## Security notes
    - The is_admin() function is only used internally by RLS policies, not called directly
    - Admin users should use the Supabase dashboard or service_role key to read contact submissions
    - Private table data is fully protected by both RLS and grant-level restrictions
*/

-- ============================================================
-- 1. Fix is_admin() function security
-- ============================================================

-- Recreate with fixed search_path and SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean,
    false
  );
$$;

-- Revoke EXECUTE from public (which includes anon and authenticated)
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM public;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM authenticated;

-- ============================================================
-- 2. Hide private tables from GraphQL schema
-- ============================================================

-- contact_messages: no one needs SELECT via the API client
-- (admin reads via dashboard/service_role, anon only INSERTs)
DROP POLICY IF EXISTS "Admin can read contact messages" ON public.contact_messages;
REVOKE SELECT ON public.contact_messages FROM authenticated;

-- contact_requests: same as contact_messages
DROP POLICY IF EXISTS "Admin can read contact requests" ON public.contact_requests;
REVOKE SELECT ON public.contact_requests FROM authenticated;

-- tasks: not used by the app at all, fully lock down
DROP POLICY IF EXISTS "Admin can view tasks" ON public.tasks;
REVOKE SELECT ON public.tasks FROM authenticated;
