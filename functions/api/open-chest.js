import { json, readBody, getClients } from "./_utils.js";
export async function onRequestPost({ request, env }) {
  try {
    const body = await readBody(request);
    const { user, serviceClient } = await getClients(env, request);
    const { data: character } = await serviceClient.from("characters").select("id,gold").eq("user_id", user.id).single();
    if (!character) throw new Error("Personagem não encontrado.");
    const rewardGold = body.chestType === "rare" ? 120 : 25;
    await serviceClient.from("characters").update({ gold: Number(character.gold || 0) + rewardGold }).eq("id", character.id);
    await serviceClient.from("character_chronicles").insert({ character_id: character.id, event_type:"chest", title:"Baú Aberto", description:`Encontrou ${rewardGold} ouro.` });
    return json({ ok:true, reward: { gold: rewardGold, item: "Poção de Cura" } });
  } catch (e) { return json({ error: e.message }, 400); }
}
