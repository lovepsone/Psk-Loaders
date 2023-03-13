/*
* @author lovepsone 2019 - 2023
*/

const HELMET = {
	'Medium': {
		id: 0,
		file: './Game/Characters/Male/Head/Helmet/Male_MediumHelmet_01/SK_Male_MediumHelmet_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'Heavy': {
		id: 1,
		file: './Game/Characters/Male/Head/Helmet/Male_HeavyHelmet_01/SK_Male_HeavyHelmet_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'Biker': {
		id: 2,
		file: './Game/Characters/Male/Head/Helmet/Male_BikerHelmet_01/SK_Male_BikerHelmet_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'Military1': {
		id: 3,
		file: './Game/Characters/Male/Head/Helmet/Hat_Military_01/Hat_Military_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'Military2': {
		id: 4,
		file: './Game/Characters/Male/Head/Helmet/Hat_Military_02/SK_Male_Hat_Military_02.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'Military3': {
		id: 5,
		file: './Game/Characters/Male/Head/Helmet/Hat_Military_03/SK_Male_Hat_Military_03.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'Stalker': {
		id: 6,
		file: './Game/Characters/Male/Head/Helmet/Male_Hat_Stalker_01/SK_Male_Hat_Stalker_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'Bandit': {
		id: 7,
		file: './Game/Characters/Male/Head/Helmet/Male_Hat_Bandit_01/SK_Male_Hat_Bandit_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'Edge': {
		id: 8,
		file: './Game/Characters/Male/Head/Helmet/Hat_Edge_01/SK_Male_Hat_Edge_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'Casual': {
		id: 9,
		file: './Game/Characters/Male/Head/Helmet/Hat_Casual_01/Hat_Casual_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
};

const HEAD = {
	'Male': {
		id: 0,
		file: './Game/Characters/Male/Bodies/MaleBase_01_Head/SK_MaleBase_01_Head.psk'
	}
};

const MASK = {
	'Military': {
		id: 0,
		file: './Game/Characters/Male/Head/Mask/Mask_Military_01/SK_Mask_Military_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'MilitaryRespirator': {
		id: 1,
		file: './Game/Characters/Male/Head/Mask/Male_MilitaryRespirator_01/SK_Male_MilitaryRespirator_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'RespiratorMK1': {
		id: 2,
		file: './Game/Characters/Male/Head/Mask/Male_CivilRespiratorMK1_01/SK_Male_CivilRespiratorMK1_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
	'RespiratorMK2': {
		id: 3,
		file: './Game/Characters/Male/Head/Mask/Male_CivilRespiratorMK2_01/SK_Male_CivilRespiratorMK2_01.psk',
		texture: './Game/Characters/Textures/Head/',
	},
};

const NECK = {
	'Male': {
		id: 0,
		file: './Game/Characters/Male/Bodies/MaleBase_01_Body/SK_MaleBase_01_TorsoForTShirt.psk'
	}
};

const TORSO = {
	'TShirt': {
		id: 0,
		file: './Game/Characters/Male/Torso/Male_TShirt_01/SK_Male_TShirt_01.psk',
		TypeHands: 'shirt',
		texture: './Game/Characters/Textures/Torso/',
	},
	'HazmatMK1': {
		id: 1,
		file: './Game/Characters/Male/Torso/Male_Hazmat_Armor_MK1_01/SK_Male_HazmatArmorMK1_01.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'HazmatMK2': {
		id: 2,
		file: './Game/Characters/Male/Torso/Male_Hazmat_Armor_MK2_01/SK_Male_HazmatArmorMK2_01.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'HazmatMK3': {
		id: 3,
		file: './Game/Characters/Male/Torso/Male_Hazmat_Armor_MK3_01/SK_Male_HazmatArmorMK3_01.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'Heavy': {
		id: 4,
		file: './Game/Characters/Male/Torso/Male_HeavyArmor_01/SK_Male_HeavyArmor_01.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'Jacket1': {
		id: 5,
		file: './Game/Characters/Male/Torso/Male_Jacket_Bandit_01/SK_Male_Jacket_Bandit_01.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'Jacket2': {
		id: 6,
		file: './Game/Characters/Male/Torso/Male_Jacket_Bandit_02/SK_Male_Jacket_Bandit_02.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'JacketEdge1': {
		id: 7,
		file: './Game/Characters/Male/Torso/Male_Jacket_Edge_01/SK_Male_Jacket_Edge_01.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'JacketEdge2': {
		id: 8,
		file: './Game/Characters/Male/Torso/Male_Jacket_Edge_02/SK_Male_Jacket_Edge_02.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'JacketMilitary1': {
		id: 9,
		file: './Game/Characters/Male/Torso/Male_Jacket_Military_01/SK_Male_Jacket_Military_01.psk',
		TypeHands: 'shirt',
		texture: './Game/Characters/Textures/Torso/',
	},
	'JacketMilitary2': {
		id: 10,
		file: './Game/Characters/Male/Torso/Male_Jacket_Military_02/SK_Male_Jacket_Military_02.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'JacketStalker1': {
		id: 11,
		file: './Game/Characters/Male/Torso/Male_Jacket_Stalker_01/SK_Male_Jacket_Stalker_01.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'JacketStalker2': {
		id: 12,
		file: './Game/Characters/Male/Torso/Male_Jacket_Stalker_02/SK_Male_Jacket_Stalker_02.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'Light': {
		id: 13,
		file: './Game/Characters/Male/Torso/Male_LightArmor_01/SK_Male_LightArmor_01.psk',
		TypeHands: 'jaket',
		texture: './Game/Characters/Textures/Torso/',
	},
	'Medium': {
		id: 14,
		file: './Game/Characters/Male/Torso/Male_MediumArmor_01/SK_Male_MediumArmor_01.psk',
		TypeHands: 'shirt',
		texture: './Game/Characters/Textures/Torso/',
	},
};

const HANDS = {
	'shirt': {
		id: 0,
		file: './Game/Characters/Male/Bodies/MaleBase_01_Body/SK_MaleBase_01_ArmsForTShirt.psk',
		texture: './Game/Characters/Textures/',
	},
	'jaket': {
		id: 1,
		file: './Game/Characters/Male/Bodies/MaleBase_01_Body/SK_MaleBase_01_ArmsForJaket.psk',
		texture: './Game/Characters/Textures/',
	}
};

const LEGS = {
	'Pants': {
		id: 0,
		file: './Game/Characters/Male/Legs/Pants_01/SK_Pants_01.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Heavy': {
		id: 1,
		file: './Game/Characters/Male/Legs/Male_HeavyPants_01/SK_Male_HeavyPants_01.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Light': {
		id: 2,
		file: './Game/Characters/Male/Legs/Male_LightPants_01/SK_Male_LightPants_01.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Medium': {
		id: 3,
		file: './Game/Characters/Male/Legs/Male_MediumPants_01/SK_Male_MediumPants_01.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Bandit1': {
		id: 4,
		file: './Game/Characters/Male/Legs/Male_Pants_Bandit_01/SK_Male_Pants_Bandit_01.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Bandit2': {
		id: 5,
		file: './Game/Characters/Male/Legs/Male_Pants_Bandit_02/SK_Male_Pants_Bandit_02.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Edge1': {
		id: 6,
		file: './Game/Characters/Male/Legs/Male_Pants_Edge_01/SK_Male_Pants_Edge_01.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Edge2': {
		id: 7,
		file: './Game/Characters/Male/Legs/Male_Pants_Edge_02/SK_Male_Pants_Edge_02.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Military1': {
		id: 8,
		file: './Game/Characters/Male/Legs/Male_Pants_Military_01/SK_Male_Pants_Military_01.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Military2': {
		id: 9,
		file: './Game/Characters/Male/Legs/Male_Pants_Military_02/SK_Male_Pants_Military_02.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Military3': {
		id: 10,
		file: './Game/Characters/Male/Legs/Male_Pants_Military_03/SK_Male_Pants_Military_03.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Stalker1': {
		id: 11,
		file: './Game/Characters/Male/Legs/Male_Pants_Stalker_01/SK_Male_Pants_Stalker_01.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
	'Stalker2': {
		id: 12,
		file: './Game/Characters/Male/Legs/Male_Pants_Stalker_02/SK_Male_Pants_Stalker_02.psk',
		texture: './Game/Characters/Textures/Legs/',
	},
};

const BACK = {
	'Small': {
		id: 0,
		file: './Game/Characters/Male/Back/Male_Backpack_Small_01/SK_Male_Backpack_Small_01.psk',
		texture: './Game/Characters/Textures/Back/',
	},
	'Medium': {
		id: 1,
		file: './Game/Characters/Male/Back/Male_Backpack_Medium_01/SK_Backpack_Medium_01.psk',
		texture: './Game/Characters/Textures/Back/',
	},
	'Large': {
		id: 2,
		file: './Game/Characters/Male/Back/Male_Backpack_Large_01/SK_Male_Backpack_Large_01.psk',
		texture: './Game/Characters/Textures/Back/',
	},
	'OxygenMK1': {
		id: 3,
		file: './Game/Characters/Male/Back/Male_OxygenTankMK1_01/SK_Male_OxygenTankMK1_01.psk',
		texture: './Game/Characters/Textures/Back/',
	},
	'OxygenMK2': {
		id: 4,
		file: './Game/Characters/Male/Back/Male_OxygenTankMK2_01/SK_OxygenTankMK2_01.psk',
		texture: './Game/Characters/Textures/Back/',
	},
	'OxygenMK3': {
		id: 5,
		file: './Game/Characters/Male/Back/Male_OxygenTankMK3_01/SK_Male_OxygenTankMK3_01.psk',
		texture: './Game/Characters/Textures/Back/',
	},
};

const FEET = {
	'Sneakers': {
		id: 0,
		file: './Game/Characters/Male/Feet/Sneakers_01/SK_Sneakers_01.psk'
	},
};

export const CHARACTERS = {HELMET, HEAD, MASK, NECK, TORSO, HANDS, LEGS, BACK, FEET};