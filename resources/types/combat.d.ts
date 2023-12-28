export type CombatResult = {
    enemy: Enemy;
    rounds: number;
    misses: number;
    hits: number;
    defends: number;
    userHealth: number;
    enemyHealth: number;
    win: boolean;
    gold: number;
    exp: number;
};
