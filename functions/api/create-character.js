import { json, readBody, getClients } from "./_utils.js";
export async function onRequestPost({ request, env }) {
  try {
    const body = await readBody(request);
    const { user, serviceClient } = await getClients(env, request);
    const { data: family } = await serviceClient.from("families").select("id").eq("key", body.family || "valmorne").single();
    const { data, error } = await serviceClient.from("characters").insert({
      user_id: user.id, name: body.name, race_key: body.race, class_name: body.class_name, family_id: family?.id, biography: body.story
    }).select().single();
    if (error) throw error;
    await serviceClient.from("character_chronicles").insert({ character_id: data.id, event_type: "creation", title: "Despertar", description: "O personagem despertou em Aetherion." });
    return json({ ok: true, character: data });
  } catch (e) { return json({ error: e.message }, 400); }
}
