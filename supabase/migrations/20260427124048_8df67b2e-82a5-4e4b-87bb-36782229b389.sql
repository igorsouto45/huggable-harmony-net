-- Fix security path for the function
ALTER FUNCTION public.handle_new_user() SET search_path = public;

-- Revoke public execution and restrict it to service role if possible, 
-- but since it's a trigger on auth.users (which happens at system level), 
-- we just need to make sure it's not exposed to public/authenticated users directly via RPC.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;