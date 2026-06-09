import { itemRegistry } from './itemRegistry';

export const starterItems = itemRegistry.filter((item) => ['espada_de_ferro','escudo_valmorne','pocao_de_cura','pocao_de_mana','cristal_de_eter','fragmento_da_ruptura'].includes(item.key));
