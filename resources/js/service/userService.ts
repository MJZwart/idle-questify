import {ref} from 'vue';
import {User} from 'types/user';
import {CombatResult} from 'types/combat';
import {calculateHitPoints} from './userStatService';
import {randomBetweenSmall, roundToDecimals} from '../helpers/numberHelper';
import {experienceCapForLevel} from '../helpers/experienceForLevel';
import {addSuccessToast} from '../components/global/toast/toastService';
import {
    MIN_DMG_ADDITION,
    MAX_DMG_ADDITION,
    MIN_PWR_ADDITION,
    MAX_PWR_ADDITION,
    MIN_HIT_ADDITION,
    MAX_HIT_ADDITION,
    MIN_DEF_ADDITION,
    MAX_DEF_ADDITION,
    MIN_DDG_ADDITION,
    MAX_DDG_ADDITION,
    MIN_CRT_CHN_ADDITION,
    MAX_CRT_CHN_ADDITION,
    MIN_CRT_DMG_ADDITION,
    MAX_CRT_DMG_ADDITION,
    HIT_MODIFIER,
    DMG_MODIFIER,
} from 'assets/variables/progress';

export const createNewUser = (): User => {
    return {
        lastSave: new Date(),
        level: 1,
        experience: 0,
        gold: 0,

        food: 0,
        wood: 0,
        metal: 0,
        stone: 0,

        baseHealth: 100,
        damage: 1,
        power: 1,
        hit: 1,
        defence: 1,
        dodge: 1, // UNUSED
        criticalChance: 1,
        criticalDamage: 0.5, // In percentages

        farming: 1,
        farming_exp: 1,
        woodcutting: 1,
        woodcutting_exp: 1,
        mining: 1,
        mining_exp: 1,
        stonecutting: 1,
        stonecutting_exp: 1,
    };
};

export const user = ref<User>(createNewUser());

export const applyExperience = (results: CombatResult, amount = 1): void => {
    user.value.experience += results.exp * amount;
    checkAndApplyLevelUp();
    const damageTakenModifier = roundToDecimals(1 - results.userHealth / calculateHitPoints.value + DMG_MODIFIER, 3);
    const hitModifier = roundToDecimals(1 - results.hits / results.rounds + HIT_MODIFIER, 3);
    user.value.damage +=
        results.enemy.level * roundToDecimals(randomBetweenSmall(MIN_DMG_ADDITION, MAX_DMG_ADDITION), 5) * amount;
    user.value.power +=
        results.enemy.level * roundToDecimals(randomBetweenSmall(MIN_PWR_ADDITION, MAX_PWR_ADDITION), 5) * amount;
    user.value.hit +=
        results.enemy.level *
        roundToDecimals(randomBetweenSmall(MIN_HIT_ADDITION, MAX_HIT_ADDITION), 5) *
        hitModifier *
        amount;
    user.value.defence +=
        results.enemy.level *
        roundToDecimals(randomBetweenSmall(MIN_DEF_ADDITION, MAX_DEF_ADDITION), 5) *
        damageTakenModifier *
        amount;
    user.value.dodge +=
        results.enemy.level * roundToDecimals(randomBetweenSmall(MIN_DDG_ADDITION, MAX_DDG_ADDITION), 5) * amount;
    user.value.criticalChance +=
        results.enemy.level *
        roundToDecimals(randomBetweenSmall(MIN_CRT_CHN_ADDITION, MAX_CRT_CHN_ADDITION), 5) *
        amount;
    user.value.criticalDamage +=
        ((results.enemy.level * roundToDecimals(randomBetweenSmall(MIN_CRT_DMG_ADDITION, MAX_CRT_DMG_ADDITION), 5)) /
            4) *
        amount;
};

const checkAndApplyLevelUp = (): void => {
    if (user.value.experience >= experienceCapForLevel(user.value.level)) {
        user.value.experience -= experienceCapForLevel(user.value.level);
        user.value.level++;

        addSuccessToast('Level up!');
        checkAndApplyLevelUp();
    }
};

export const checkUserIntegrity = () => {
    const baseUser = createNewUser();
    Object.keys(baseUser).forEach(key => {
        if (!(key in user.value)) {
            console.log(key + ' not found, adding');
            user.value[key] = baseUser[key];
        }
    });
};
