import { useMemo } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '../types/supabase';

export function getSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function useSupabaseClient() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabaseClient;