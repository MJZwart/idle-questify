import {Enemy} from 'types/enemy';
import {calculateDamage, calculateHitChance, calculateHitPoints} from './userStatService';
import {ref, computed} from 'vue';
import {applyExperience, user} from './userService';
import {CombatResult} from 'types/combat';
import {enemies} from 'assets/lists/enemies';
import {randomBetween} from '../helpers/randomHelper';

const activeCombat = ref<NodeJS.Timeout>();
export const isCombatActive = computed(() => activeCombat.value !== undefined);
export const latestCombatResult = ref<CombatResult>();

export const selectedEnemyId = ref<number | null>(null); // TODO Automatically pick selected from last selection
export const selectedEnemy = computed(() => {
    if (selectedEnemyId === null) return null;
    return enemies.find(enemy => enemy.id === selectedEnemyId.value) ?? null;
});

export const startCombat = (): void => {
    if (!selectedEnemy) return;
    if (isCombatActive.value) return;
    fightEnemy();
    activeCombat.value = setInterval(fightEnemy, 3000);
};
export const endCombat = (): void => {
    clearInterval(activeCombat.value);
};

/**
 * Initiates combat. Each fight has a max of 250 rounds (after which it is a draw)
 * The results are applied and saved locally for this round. These will be overwritten every fight.
 */
export const fightEnemy = (): void => {
    console.log('starting fight');
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
        enemy,
        rounds,
        misses,
        hits,
        defends,
        userHealth,
        enemyHealth: enemy.health,
        win,
        gold: Math.floor(enemy.level * randomBetween(1, 5)),
        exp: enemy.level * 10,
    };
    applyResults(latestCombatResult.value);
};

/**
 * Calculates the damage done and damage taken, then returns the user health or miss/hit
 */
const calculateRound = (enemy: Enemy, userHealth: number): number | 'miss' | 'defended' => {
    const hitChance = calculateHitChance.value;
    if (Math.random() > hitChance) return 'miss';
    const damageDone = calculateDamageDone(enemy);
    if (damageDone === 0) return 'defended';
    enemy.health -= damageDone;
    const damageTaken = calculateDamageTaken(enemy);
    userHealth -= damageTaken;
    return userHealth;
};

/**
 * Damage done is a random number * user damage * reduction
 */
const calculateDamageDone = (enemy: Enemy): number => {
    const reduction = calculateDamageReduction(
        user.value.hit * randomBetween(0.5, 1.5),
        enemy.defence * randomBetween(0.5, 1.5),
    );
    if (reduction === 1) return 0;
    let userDamage = calculateDamage.value * randomBetween(0.5, 1.5);

    return userDamage - userDamage * reduction;
};
/**
 * Damage taken is a random number * enemy damage * reduction
 */
const calculateDamageTaken = (enemy: Enemy): number => {
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
const calculateDamageReduction = (hit: number, defence: number): number => {
    if (defence > hit) {
        const reduction = defence - hit - 1;
        if (reduction > 1) return 1;
        return reduction;
    }
    return 0;
};

/**
 * Applies the given gold and experience to the user
 */
const applyResults = (results: CombatResult): void => {
    user.value.gold += results.gold;
    applyExperience(results);
};
