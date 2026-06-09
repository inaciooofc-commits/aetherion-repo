import { supabase, isSupabaseConfigured } from "./supabase";

export async function getSession() {
  if (!isSupabaseConfigured) return { session: null, error: null };
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}

export async function signOut() {
  if (!isSupabaseConfigured) return;
  await supabase.auth.signOut();
}
