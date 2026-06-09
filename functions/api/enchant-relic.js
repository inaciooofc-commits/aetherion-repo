import { json, readBody, getClients } from "./_utils.js";
export async function onRequestPost({ request, env }) { try { const body = await readBody(request); await getClients(env, request); return json({ ok:true, name:`Relíquia encantada com ${body.element || "Éter"}` }); } catch(e){ return json({ error:e.message },400); } }
