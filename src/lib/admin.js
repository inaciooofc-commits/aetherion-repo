import { supabase, isSupabaseConfigured } from "./supabase";

export const ADMIN_EMAILS = ["inaciooofc@gmail.com"];

export async function getAdminState() {
  if (!isSupabaseConfigured) return { isAdmin: true, email: "offline-admin@local", reason: "offline" };
  const { data } = await supabase.auth.getUser();
  const email = data?.user?.email || "";
  const isAdminEmail = ADMIN_EMAILS.includes(email.toLowerCase());
  if (isAdminEmail) return { isAdmin: true, email, reason: "email" };
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", data?.user?.id).maybeSingle();
  return { isAdmin: profile?.role === "admin", email, reason: "profile" };
}
