export const OXX = {
  version: '0.4.0-phaser-stable',
  adminEmail: import.meta.env.VITE_ADMIN_EMAIL || 'inaciooofc@gmail.com',
  state: {
    characterId: 'valorian_knight',
    regionId: 'valoria',
    inventory: ['item_sword', 'item_potion', 'item_crystal'],
    chat: []
  },
  setCharacter(id) {
    this.state.characterId = id;
    window.dispatchEvent(new CustomEvent('oxx:character:set', { detail: { id } }));
  },
  travel(region) {
    this.state.regionId = region.id;
    window.dispatchEvent(new CustomEvent('oxx:travel', { detail: region }));
  },
  addChat(message) {
    this.state.chat.push({ ...message, time: Date.now() });
    window.dispatchEvent(new CustomEvent('oxx:chat', { detail: message }));
  },
  isAdmin(email) {
    return String(email || '').toLowerCase() === String(this.adminEmail).toLowerCase();
  }
};
window.OXX = OXX;
