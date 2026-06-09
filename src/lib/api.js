import { supabase, isSupabaseConfigured } from "./supabase";

async function authHeader() {
  if (!isSupabaseConfigured) return {};
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiPost(path, body) {
  const headers = { "Content-Type": "application/json", ...(await authHeader()) };
  const response = await fetch(path, { method: "POST", headers, body: JSON.stringify(body || {}) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Falha na ação.");
  return data;
}

export async function apiGet(path) {
  const headers = await authHeader();
  const response = await fetch(path, { headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Falha na leitura.");
  return data;
}
