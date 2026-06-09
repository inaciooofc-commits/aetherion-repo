import { json, readBody, getClients } from "./_utils.js";
function calcDamage(action, attacker, defender) {
  if (action === "defend") return { damage: 0, message: "Postura defensiva ativada." };
  const base = action === "magic" ? attacker.magic * 1.3 + 10 : attacker.strength * 1.2 + 8;
  const reduction = action === "magic" ? defender.magic_resistance * 0.7 : defender.defense * 0.6;
  const damage = Math.max(1, Math.floor(base - reduction));
  return { damage, message: `${action} causou ${damage} de dano.` };
}
export async function onRequestPost({ request, env }) {
  try {
    const body = await readBody(request);
    const { user, serviceClient } = await getClients(env, request);
    const { data: character, error } = await serviceClient.from("characters").select("*").eq("user_id", user.id).single();
    if (error) throw error;
    const attacker = { strength: character.strength, magic: character.magic };
    const defender = { defense: body.defenderDefense || 8, magic_resistance: body.defenderMagicResistance || 5 };
    const result = calcDamage(body.action || "attack", attacker, defender);
    await serviceClient.from("battle_logs").insert({ character_id: character.id, action_type: body.action || "attack", result });
    return json({ ok: true, ...result, hit: result.damage > 0 });
  } catch (e) { return json({ error: e.message }, 400); }
}
