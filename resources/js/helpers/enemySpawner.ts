import {Enemy} from 'types/enemy';
import {BASE_HEALTH, BASE_STAT, HEALTH_ADDITIVE, STAT_ADDITIVE} from 'assets/variables/enemies';

export const spawnEnemy = (level: number): Enemy => {
    const baseHealth = BASE_HEALTH;
    const baseStat = BASE_STAT;
    const healthAdditive = HEALTH_ADDITIVE;
    const statAdditive = STAT_ADDITIVE;
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
