import {Enemy} from 'types/enemy';

export const spawnEnemy = (level: number): Enemy => {
    const baseHealth = 95;
    const baseStat = 0.475;
    const healthAdditive = 5;
    const statAdditive = 0.025;
    const health = baseHealth + healthAdditive * ((level * (level + 1) * (2 * level + 1)) / 6);
    const stat = baseStat + statAdditive * ((level * (level + 1) * (2 * level + 1)) / 6);
    return {
        id: level,
        name: 'Enemy #' + level,
        level: level,
        attack: stat,
        defence: stat,
        health,
    };
};
