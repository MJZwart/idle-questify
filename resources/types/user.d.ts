export type User = {
    lastSave: Date;
    level: number;
    experience: number;
    gold: number;

    baseHealth: number;
    damage: number; // Raw damage
    power: number; // Effectiveness against defence
    hit: number; // Chance to hit enemy, lowered by dodge
    defence: number; // Chance to deflect attacks
    dodge: number; // Chance to entirely evade attack, lowers enemy hit
    criticalChance: number; // Critical hit chance
    criticalDamage: number; // Critical damage modifier

    // Weapon expertise
};
