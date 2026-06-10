export const OXX_WORLD_MAP = {
  key: "aetherion_full_board",
  texture: "/assets/maps/aetherion_full_board.png",
  width: 1448,
  height: 1086,
  playerStart: { x: 220, y: 185 },
  fastTravel: [
    { key: "valoria", name: "Valoria", x: 180, y: 165, target: { x: 220, y: 185 }, zone: "Verde", desc: "Cidadela, casas, muralhas, pontes e campos seguros." },
    { key: "elarion", name: "Elarion", x: 665, y: 170, target: { x: 660, y: 230 }, zone: "Amarela", desc: "Floresta arcana, casas arbóreas, lagos e portais lunares." },
    { key: "krag_dhur", name: "Krag-Dhur", x: 1140, y: 170, target: { x: 1130, y: 235 }, zone: "Amarela", desc: "Montanhas, minas, muralhas de pedra e portões de forja." },
    { key: "gorvakar", name: "Gorvakar", x: 220, y: 535, target: { x: 250, y: 535 }, zone: "Vermelha", desc: "Acampamentos, arenas, barricadas e rotas de guerra." },
    { key: "drakmorne", name: "Drakmorne", x: 770, y: 530, target: { x: 770, y: 520 }, zone: "Vermelha", desc: "Castelo vulcânico, lava, muralhas queimadas e portões de obsidiana." },
    { key: "nythra", name: "Pântano de Nythra", x: 1180, y: 535, target: { x: 1180, y: 545 }, zone: "Negra", desc: "Casas em palafitas, pontes estreitas, lama e árvores mortas." },
    { key: "solkar", name: "Deserto de Solkar", x: 330, y: 860, target: { x: 345, y: 830 }, zone: "Amarela", desc: "Ruínas soterradas, mercados nômades, muros partidos e portões antigos." },
    { key: "abismo", name: "Abismo de Éter", x: 1050, y: 850, target: { x: 1065, y: 845 }, zone: "Anômala", desc: "Pontes flutuantes, plataformas, ruínas e energia instável." }
  ],
  buildings: [
    { name: "Cidadela de Valoria", x: 146, y: 92, w: 190, h: 120, type: "city" },
    { name: "Casas de Valoria", x: 75, y: 250, w: 215, h: 90, type: "houses" },
    { name: "Árvore-Mãe de Elarion", x: 600, y: 70, w: 190, h: 180, type: "sacred" },
    { name: "Casas Arcanas", x: 775, y: 190, w: 115, h: 95, type: "houses" },
    { name: "Fortaleza de Krag-Dhur", x: 1010, y: 40, w: 330, h: 270, type: "fortress" },
    { name: "Arena dos Ossos", x: 85, y: 405, w: 150, h: 115, type: "arena" },
    { name: "Acampamento Gorvathar", x: 250, y: 430, w: 210, h: 155, type: "camp" },
    { name: "Castelo Vulcânico", x: 640, y: 395, w: 270, h: 215, type: "castle" },
    { name: "Vila de Nythra", x: 1060, y: 400, w: 280, h: 210, type: "swamp" },
    { name: "Ruínas de Solkar", x: 80, y: 720, w: 390, h: 260, type: "ruins" },
    { name: "Plataformas do Abismo", x: 820, y: 715, w: 500, h: 300, type: "anomaly" }
  ],
  gates: [
    { name: "Portão Norte de Valoria", x: 206, y: 265, w: 46, h: 40, target: "valoria" },
    { name: "Portão de Elarion", x: 620, y: 318, w: 52, h: 42, target: "elarion" },
    { name: "Portão de Forja", x: 1064, y: 314, w: 58, h: 48, target: "krag_dhur" },
    { name: "Portão Carmesim", x: 430, y: 560, w: 46, h: 48, target: "gorvakar" },
    { name: "Portão de Obsidiana", x: 720, y: 650, w: 58, h: 52, target: "drakmorne" },
    { name: "Ponte de Nythra", x: 1048, y: 637, w: 52, h: 48, target: "nythra" },
    { name: "Arco de Solkar", x: 420, y: 762, w: 70, h: 52, target: "solkar" },
    { name: "Ponte do Nada", x: 885, y: 710, w: 60, h: 46, target: "abismo" }
  ],
  collisionRects: [
    { x: 0, y: 0, w: 1448, h: 28 },
    { x: 0, y: 1058, w: 1448, h: 28 },
    { x: 0, y: 0, w: 28, h: 1086 },
    { x: 1420, y: 0, w: 28, h: 1086 },
    { x: 85, y: 60, w: 225, h: 145 },
    { x: 995, y: 30, w: 350, h: 285 },
    { x: 610, y: 405, w: 315, h: 245 },
    { x: 825, y: 720, w: 510, h: 310 },
    { x: 1015, y: 415, w: 320, h: 245 },
    { x: 80, y: 730, w: 210, h: 110 }
  ]
};
