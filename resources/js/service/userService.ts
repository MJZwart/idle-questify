import {ref} from 'vue';
import {User} from 'types/user';
import {CombatResult} from 'types/combat';
import {calculateHitPoints} from './userStatService';
import {randomBetweenSmall, roundToDecimals} from '../helpers/randomHelper';
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
    const damageTakenModifier = roundToDecimals(results.userHealth / calculateHitPoints.value, 3);
    const hitModifier = roundToDecimals(results.hits / results.rounds, 3);
    const baseExperienceModifier = results.enemy.level * roundToDecimals(randomBetweenSmall(0.001, 0.005), 5);
    user.value.damage += baseExperienceModifier;
    user.value.power += baseExperienceModifier;
    user.value.hit += baseExperienceModifier * hitModifier;
    user.value.defence += baseExperienceModifier * damageTakenModifier;
    user.value.dodge += baseExperienceModifier;
    user.value.criticalChance += baseExperienceModifier;
    user.value.criticalDamage += baseExperienceModifier / 4;
};

const checkAndApplyLevelUp = (): void => {
    if (user.value.experience >= experienceCapForLevel(user.value.level)) {
        user.value.experience -= experienceCapForLevel(user.value.level);
        user.value.level++;
        checkAndApplyLevelUp();
    }
};

// const experienceCapForLevel = (level: number): number => {};
