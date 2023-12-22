import {Enemy} from 'types/enemy';
import {calculateDamage, calculateHitChance, calculateHitPoints} from './userStatService';
import {ref} from 'vue';
import {user} from './userService';

export const selectedEnemy = ref<Enemy | null>(null);

const activeCombat = ref<NodeJS.Timeout>();
export const latestCombatResult = ref();

export const startCombat = () => {
    fightEnemy();
    activeCombat.value = setInterval(fightEnemy, 10000);
};
export const endCombat = () => {
    clearInterval(activeCombat.value);
};

export const fightEnemy = () => {
    // console.log('starting fight');
    let rounds = 1;
    let misses = 0;
    let hits = 0;
    let defends = 0;
    let userHealth = calculateHitPoints.value;
    const enemy = <Enemy>{...selectedEnemy.value};
    if (!enemy) return;
    while (rounds < 250 && userHealth > 0 && enemy.health > 0) {
        const result = calculateRound(enemy, userHealth);
        if (result === 'miss') misses++;
        else if (result === 'defended') defends++;
        else {
            userHealth = result;
            hits++;
        }
        rounds++;
    }
    const win = userHealth > 0 && enemy.health < 0;
    latestCombatResult.value = {
        rounds,
        misses,
        hits,
        defends,
        userHealth,
        enemyHealth: enemy.health,
        win,
    };
};

const calculateRound = (enemy: Enemy, userHealth: number) => {
    // console.log('starting round');
    const hitChance = calculateHitChance.value;
    if (Math.random() > hitChance) return 'miss';
    const damageDone = calculateDamageDone(enemy);
    // console.log('damage done', damageDone);
    if (damageDone === 0) return 'defended';
    enemy.health -= damageDone;
    const damageTaken = calculateDamageTaken(enemy);
    userHealth -= damageTaken;
    // console.log('damage taken', damageTaken);
    return userHealth;
};

const calculateDamageDone = (enemy: Enemy) => {
    const reduction = calculateDamageReduction(
        user.value.hit * randomBetween(0.5, 1.5),
        enemy.defence * randomBetween(0.5, 1.5),
    );
    if (reduction === 1) return 0;
    let userDamage = calculateDamage.value * randomBetween(0.5, 1.5);

    return userDamage - userDamage * reduction;
};
const calculateDamageTaken = (enemy: Enemy) => {
    const reduction = calculateDamageReduction(
        enemy.attack * randomBetween(0.5, 1.5), // Enemy doesn't have hit, only attack
        user.value.defence * randomBetween(0.5, 1.5),
    );
    if (reduction === 1) return 0;
    let enemyDamage = enemy.attack * randomBetween(0.5, 1.5);
    return enemyDamage - enemyDamage * reduction;
};

/*
    The enemy's defence gets brought up against your hit number. Both get a random multiplier
    If the enemy's defence is higher than your hit, the damage gets reduced with a %
*/
const calculateDamageReduction = (hit: number, defence: number) => {
    if (defence > hit) {
        const reduction = defence - hit - 1;
        if (reduction > 1) return 1;
        return reduction;
    }
    return 0;
};

const randomBetween = (min: number, max: number) => {
    return Math.random() * (max - min + 1) + min;
};
