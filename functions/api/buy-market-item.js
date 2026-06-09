import { json, readBody, getClients } from "./_utils.js";
export async function onRequestPost({ request, env }) { try { await getClients(env, request); return json({ ok:true, message:"Compra validada. Implemente transação RPC para produção." }); } catch(e){ return json({ error:e.message },400); } }
