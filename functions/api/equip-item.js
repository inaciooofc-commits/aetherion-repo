import { json, readBody, getClients } from "./_utils.js";
export async function onRequestPost({ request, env }) {
  try {
    const body = await readBody(request);
    const { user, serviceClient } = await getClients(env, request);
    const { data: character } = await serviceClient.from("characters").select("id").eq("user_id", user.id).single();
    if (!character) throw new Error("Personagem não encontrado.");
    const payload = { character_id: character.id, slot: body.slot, visual_key: body.visual_key, item_key: body.item_key };
    await serviceClient.from("equipment").upsert(payload, { onConflict: "character_id,slot" });
    return json({ ok: true, equipment: payload });
  } catch (e) { return json({ error: e.message }, 400); }
}
