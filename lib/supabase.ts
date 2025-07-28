import { createClient } from '@supabase/supabase-js';
import { getClientEnv, getServerEnv } from './env';

// Client-side Supabase client
export function createClientSupabase() {
  try {
    const env = getClientEnv();
    
    if (!env.supabaseUrl || !env.supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    return createClient(env.supabaseUrl, env.supabaseAnonKey);
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    throw error;
  }
}

// Server-side Supabase client (with service role key)
export function createServerSupabase() {
  try {
    const env = getServerEnv();
    
    if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
      throw new Error('Missing Supabase server environment variables');
    }

    return createClient(env.supabaseUrl, env.supabaseServiceRoleKey);
  } catch (error) {
    console.error('Failed to create server Supabase client:', error);
    throw error;
  }
}

// Default client export
export const supabase = createClientSupabase();