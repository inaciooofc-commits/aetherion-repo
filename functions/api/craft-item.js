import { json, readBody, getClients } from "./_utils.js";
export async function onRequestPost({ request, env }) { try { const { user } = await getClients(env, request); return json({ ok:true, message:"Craft validado para " + user.id }); } catch(e){ return json({ error:e.message },400); } }
