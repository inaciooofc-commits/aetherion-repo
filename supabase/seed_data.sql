insert into public.races (key, name, description, bonus) values
('valoriano','Valoriano','Humanos de Valor, nobres e equilibrados.','{"xp":3,"gold":2}'::jsonb),
('elaris','Elaris','Filhos da floresta, lua e magia.','{"magic":4,"agility":3}'::jsonb),
('dhurakim','Dhurakim','Filhos da rocha e da forja.','{"defense":5,"vitality":3}'::jsonb),
('gorvath','Gorvath','Clãs de sangue, força e fúria.','{"strength":5,"physical_damage":3}'::jsonb),
('drakari','Drakari','Sangue do dragão e fogo ancestral.','{"strength":3,"magic":3,"fire_resistance":5}'::jsonb)
on conflict (key) do update set name=excluded.name;

insert into public.families (key, name, type, description, origin_region, motto, bonus) values
('valmorne','Casa Valmorne','main','Família de honra, liderança e equilíbrio.','Valoria','Pela coroa, pela honra e pelo sangue.','{"xp":3,"gold":2}'::jsonb),
('elarisian','Casa Elarisian','main','Família de magia, agilidade e sabedoria.','Elarion','A magia vive onde o sangue lembra.','{"magic":4,"agility":3}'::jsonb),
('dhurakar','Casa Dhurakar','main','Família de forja, defesa e resistência.','Krag-Dhur','Pedra não quebra. Sangue não recua.','{"defense":5,"vitality":3}'::jsonb),
('gorvathar','Casa Gorvathar','main','Família de força, guerra e brutalidade.','Gorvakar','Sangue forte conquista a terra.','{"strength":5,"physical_damage":3}'::jsonb),
('drakaryon','Casa Drakaryon','main','Família de fogo, magia antiga e poder ancestral.','Drakmorne','Das cinzas nasce o domínio.','{"strength":3,"magic":3,"fire_resistance":5}'::jsonb)
on conflict (key) do update set name=excluded.name;

insert into public.map_regions (key, name, zone_type, recommended_level, description) values
('valoria','Valoria','green/yellow','1-15','Campos da Coroa, Torre Quebrada, Estrada Real e Forte de Lumin.'),
('elarion','Elarion','yellow','10-25','Bosque Lunar, Lago de Prata e raízes antigas.'),
('krag-dhur','Krag-Dhur','yellow/red','15-35','Minas Profundas, Grande Forja e Câmara de Ayslan.'),
('gorvakar','Gorvakar','red','25-45','Arena dos Ossos, Vale dos Wargs e Altar de Gork.'),
('drakmorne','Drakmorne','red/black','40-60','Ruínas dracônicas e fogo ancestral.'),
('nythra','Pântano de Nythra','red','20-40','Veneno, lodo, mortos-vivos e drogas naturais.'),
('solkar','Deserto de Solkar','anomalous','30-55','Relíquias Sem Nome e máquinas soterradas.'),
('abismo','Abismo de Éter','black/anomalous','60-100','A Ruptura e o fim do mundo conhecido.'),
('olimpo','Olimpo dos Deuses Ancestrais','sacred','70+','Domínio de Mantis, Gan, Mirian, Aelyra, Gork e Ayslan.')
on conflict (key) do update set name=excluded.name;

insert into public.items (key, name, type, rarity, icon_url, visual_key, stats, stackable) values
('espada_ferro','Espada de Ferro','weapon','common','/assets/items/espada_ferro.png','weapon_sword','{"damage":8,"strength":1}'::jsonb,false),
('escudo_valmorne','Escudo Valmorne','shield','uncommon','/assets/items/escudo_valmorne.png','shield_valmorne','{"defense":7}'::jsonb,false),
('pocao_cura','Poção de Cura','consumable','common','/assets/items/pocao_cura.png',null,'{"heal":40}'::jsonb,true),
('pocao_mana','Poção de Mana','consumable','common','/assets/items/pocao_mana.png',null,'{"mana":35}'::jsonb,true),
('armadura_placas','Armadura de Placas','chest','rare','/assets/items/armadura_placas.png','armor_plate','{"defense":20,"vitality":3}'::jsonb,false),
('elmo_ferro','Elmo de Ferro','helmet','common','/assets/items/elmo_ferro.png','helmet_iron','{"defense":5}'::jsonb,false),
('cristal_eter','Cristal de Éter','material','rare','/assets/items/cristal_eter.png',null,'{}'::jsonb,true),
('fragmento_ruptura','Fragmento da Ruptura','relic','anomalous','/assets/items/fragmento_ruptura.png','aura_eter','{"magic":5,"san":3}'::jsonb,false)
on conflict (key) do update set name=excluded.name;

insert into public.professions (name, description) values
('Ferreiro','Cria armas, armaduras e ferramentas.'),
('Arcanista','Cria grimórios, selos e encantamentos.'),
('Alquimista','Cria poções, drogas naturais e antídotos.'),
('Tecnoferreiro','Encanta Relíquias Sem Nome.'),
('Caçador','Coleta couro, presas e carne.'),
('Minerador','Coleta ferro, pedra e gemas.'),
('Lenhador','Coleta madeira viva e raízes.'),
('Tecelão','Cria mantos, capas e roupas mágicas.'),
('Engenheiro de Éter','Cria máquinas encantadas.'),
('Escriba','Cria registros, contratos e escrituras.')
on conflict (name) do update set description=excluded.description;

insert into public.world_state (rupture_level, magic_stability, technology_spread, current_era)
select 3, 97, 4, 'Era do Despertar'
where not exists (select 1 from public.world_state);

-- Seed Valoria mobs
with r as (select id from public.map_regions where key='valoria')
insert into public.mobs (region_id, name, rarity, level, hp, attack, defense, sprite_key, loot_table)
select r.id, x.name, x.rarity, x.level, x.hp, x.attack, x.defense, x.sprite_key, x.loot_table::jsonb
from r, (values
('Rato de Celeiro Gigante','common',1,30,3,1,'goblin','[{"item":"pocao_cura","chance":5}]'),
('Lobo de Campo','common',2,45,6,2,'wolf','[{"item":"couro_sombrio","chance":12}]'),
('Bandido Faminto','common',3,55,7,3,'bandit','[{"gold":20,"chance":80}]'),
('Goblin Saqueador','common',4,60,8,3,'goblin','[{"item":"espada_ferro","chance":3}]'),
('Guardião da Torre Quebrada','boss',15,320,24,18,'goblin','[{"item":"cristal_eter","chance":45}]')
) as x(name,rarity,level,hp,attack,defense,sprite_key,loot_table)
on conflict do nothing;

with r as (select id from public.map_regions where key='valoria')
insert into public.npcs (region_id, name, sprite_key, dialogue, interaction_type)
select r.id, 'Arthen Valmorne', 'npc_guard', '["Todo jogador nasce de uma casa, mas apenas os fortes criam uma linhagem.","Aetherion não pertence aos reis. Pertence a quem sustenta seu povo."]'::jsonb, 'dialogue'
from r on conflict do nothing;
