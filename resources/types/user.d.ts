export type User = UserStats & {
    lastSave: Date | string;
    level: number;
    experience: number;
    gold: number;

    // Weapon expertise
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
