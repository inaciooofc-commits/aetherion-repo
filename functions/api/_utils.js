import { createClient } from "@supabase/supabase-js";

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export async function readBody(request) {
  try { return await request.json(); } catch { return {}; }
}

export async function getClients(env, request) {
  const url = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
  const anon = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY;
  const service = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !service) throw new Error("Supabase env ausente nas Functions.");
  const authClient = createClient(url, anon);
  const serviceClient = createClient(url, service);
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) throw new Error("Token ausente.");
  const { data, error } = await authClient.auth.getUser(token);
  if (error || !data.user) throw new Error("Sessão inválida.");
  return { user: data.user, serviceClient };
}
