import { json, getClients } from "./_utils.js";
export async function onRequestPost({ request, env }) {
  try { await getClients(env, request); return json({ ok:true, message:"Função registrada e pronta para expansão segura." }); }
  catch(e){ return json({ error:e.message },400); }
}
