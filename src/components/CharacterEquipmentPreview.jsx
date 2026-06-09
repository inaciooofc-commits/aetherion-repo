export default function CharacterEquipmentPreview({ equipment = {} }) {
  const armor = equipment.chest || "armor_none";
  const helmet = equipment.helmet || "helmet_none";
  const weapon = equipment.weapon || "weapon_none";
  const shield = equipment.shield || "shield_none";
  const aura = equipment.relic ? "aura_eter" : "aura_none";

  return (
    <div className="character-stack">
      <img src="/assets/characters/layers/aura_none.png" alt="" />
      <img src="/assets/characters/layers/body_valoriano.png" alt="" />
      <img src="/assets/characters/layers/clothes_base.png" alt="" />
      <img src={`/assets/characters/layers/${armor}.png`} alt="" />
      <img src="/assets/characters/layers/hair_01_black.png" alt="" />
      <img src={`/assets/characters/layers/${helmet}.png`} alt="" />
      <img src={`/assets/characters/layers/${weapon}.png`} alt="" />
      <img src={`/assets/characters/layers/${shield}.png`} alt="" />
      <img src={`/assets/characters/layers/${aura}.png`} alt="" />
    </div>
  );
}
