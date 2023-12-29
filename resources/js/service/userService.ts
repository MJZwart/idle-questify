import {ref} from 'vue';
import {User} from 'types/user';
import {CombatResult} from 'types/combat';
import {calculateHitPoints} from './userStatService';
import {randomBetweenSmall, roundToDecimals} from '../helpers/numberHelper';
import {experienceCapForLevel} from '../helpers/experienceForLevel';

const createNewUser = (): User => {
    return {
        lastSave: new Date(),
        level: 1,
        experience: 0,
        gold: 0,

        baseHealth: 100,
        damage: 1,
        power: 1,
        hit: 1,
        defence: 1,
        dodge: 1, // UNUSED
        criticalChance: 1,
        criticalDamage: 0.5, // In percentages
    };
};

export const user = ref<User>(createNewUser());

export const applyExperience = (results: CombatResult): void => {
    user.value.experience += results.exp;
    checkAndApplyLevelUp();
    const damageTakenModifier = roundToDecimals(1 - results.userHealth / calculateHitPoints.value + 0.5, 3);
    const hitModifier = roundToDecimals(1 - results.hits / results.rounds + 0.5, 3);
    user.value.damage += results.enemy.level * roundToDecimals(randomBetweenSmall(0.001, 0.005), 5);
    user.value.power += results.enemy.level * roundToDecimals(randomBetweenSmall(0.001, 0.005), 5);
    user.value.hit += results.enemy.level * roundToDecimals(randomBetweenSmall(0.001, 0.005), 5) * hitModifier;
    user.value.defence +=
        results.enemy.level * roundToDecimals(randomBetweenSmall(0.001, 0.005), 5) * damageTakenModifier;
    user.value.dodge += results.enemy.level * roundToDecimals(randomBetweenSmall(0.001, 0.005), 5);
    user.value.criticalChance += results.enemy.level * roundToDecimals(randomBetweenSmall(0.001, 0.005), 5);
    user.value.criticalDamage += (results.enemy.level * roundToDecimals(randomBetweenSmall(0.001, 0.005), 5)) / 4;
};

const checkAndApplyLevelUp = (): void => {
    if (user.value.experience >= experienceCapForLevel(user.value.level)) {
        user.value.experience -= experienceCapForLevel(user.value.level);
        user.value.level++;
        checkAndApplyLevelUp();
    }
};
