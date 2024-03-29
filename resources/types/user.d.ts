export type User = UserStats &
    UserGatheringStats &
    UserResources & {
        lastSave: Date | string;
        level: number;
        experience: number;
        gold: number;

        // Weapon expertise
    };

export type UserResources = {
    food: number;
    wood: number;
    metal: number;
    stone: number;
};

export type UserStats = {
    baseHealth: number;
    damage: number; // Raw damage
    power: number; // Effectiveness against defence
    hit: number; // Chance to hit enemy, lowered by dodge
    defence: number; // Chance to deflect attacks
    dodge: number; // Chance to entirely evade attack, lowers enemy hit
    criticalChance: number; // Critical hit chance
    criticalDamage: number; // Critical damage modifier
};

export type UserGatheringSkills = {
    farming: number;
    woodcutting: number;
    mining: number;
    stonecutting: number;
};

export type UserGatheringExp = {
    farming_exp: number;
    woodcutting_exp: number;
    mining_exp: number;
    stonecutting_exp: number;
};
