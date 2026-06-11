import { EventBus } from '../bridge/EventBus';

export class AssetRegistry {
  constructor(scene) {
    this.scene = scene;
    this.missing = new Set();
    this.fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjMWQxNDEwIiBzdHJva2U9IiNiOTkxNTAiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjQ4IiB5PSI1MCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2Q4YjQ1YyIgZm9udC1mYW1pbHk9InNlcmlmIj8+P1DVxYSDdGV4dD48L3N2Zz4=';
  }

  checkAssets() {
    const keys = this.scene.textures.getTextureKeys();
    const required = [
      'char_valorian_knight', 'mob_wolf', 'tile_grass',
      'btn_play', 'item_sword', 'npc_merchant'
    ];
    const missing = required.filter(k => !keys.includes(k));
    if (missing.length > 0) {
      this.missing = new Set(missing);
      missing.forEach(k => this.createFallback(k));
      EventBus.emit('brigs:status', { assets: `${missing.length} faltando, criados fallbacks` });
      return false;
    }
    return true;
  }

  createFallback(key) {
    if (!this.scene.textures.exists(key)) {
      const canvas = document.createElement('canvas');
      canvas.width = 96;
      canvas.height = 96;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#1d1410';
      ctx.fillRect(0, 0, 96, 96);
      ctx.strokeStyle = '#b99150';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, 96, 96);
      ctx.fillStyle = '#d8b45c';
      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      ctx.fillText('?', 48, 52);
      this.scene.textures.addCanvas(key, canvas);
    }
  }
}
