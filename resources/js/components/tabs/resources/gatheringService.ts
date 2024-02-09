import {BASE_RESOURCES, BASE_RESOURCE_EXP, MAX_SKILL_ADDITION, MIN_SKILL_ADDITION} from 'assets/variables/gathering';
import {experienceCapForLevel} from 'helpers/experienceForLevel';
import {randomBetweenSmall, roundToDecimals} from 'helpers/numberHelper';
import {capitalizeFirstLetter} from 'helpers/stringHelper';
import {clearActionInterval, isGatheringActive, setAction, startActionInterval, latestGatheringResult} from 'service/activeActionsService';
import {addSuccessToast} from 'components/global/toast/toastService';
import {user} from 'service/userService';
import {
    calculateFarmingSkill,
    calculateMiningSkill,
    calculateStonecuttingSkill,
    calculateWoodcuttingSkill,
} from 'service/userStatService';
import {UserGatheringSkills, UserGatheringExp, UserResources, UserStats} from 'types/user';
import {ref} from 'vue';

type TranslationKey = {
    skill: keyof UserGatheringSkills;
    skillExp: keyof UserGatheringExp;
};

export const gatheringTranslation: Record<keyof UserResources, TranslationKey> = {
    food: {
        skill: 'farming',
        skillExp: 'farming_exp',
    },
    wood: {
        skill: 'woodcutting',
        skillExp: 'woodcutting_exp',
    },
    metal: {
        skill: 'mining',
        skillExp: 'mining_exp',
    },
    stone: {
        skill: 'stonecutting',
        skillExp: 'stonecutting_exp',
    },
};

export const selectedGatheringType = ref<keyof UserResources | null>(null);

export const startGathering = (type: keyof UserResources) => {
    switch (type) {
        case 'food':
            if (isGatheringActive.value) {
                if (selectedGatheringType.value === 'food') break;
            } else {
                farming();
            }
            endGathering();
            setAction(farming, 'gathering');
            startActionInterval();
            break;
        case 'wood':
            if (isGatheringActive.value) {
                if (selectedGatheringType.value === 'wood') break;
            } else {
                woodcutting();
            }
            endGathering();
            setAction(woodcutting, 'gathering');
            startActionInterval();
            break;
        case 'metal':
            if (isGatheringActive.value) {
                if (selectedGatheringType.value === 'metal') break;
            } else {
                mining();
            }
            endGathering();
            setAction(mining, 'gathering');
            startActionInterval();
            break;
        case 'stone':
            if (isGatheringActive.value) {
                if (selectedGatheringType.value === 'stone') break;
            } else {
                stonecutting();
            }
            endGathering();
            setAction(stonecutting, 'gathering');
            startActionInterval();
            break;
    }
    selectedGatheringType.value = type;
};

export const endGathering = () => {
    clearActionInterval();
    selectedGatheringType.value = null;
};

const farming = () => {
    gatheringAction('food', 'hit', calculateFarmingSkill.value);
};

const woodcutting = () => {
    gatheringAction('wood', 'damage', calculateWoodcuttingSkill.value);
};

const mining = () => {
    gatheringAction('metal', 'power', calculateMiningSkill.value);
};

const stonecutting = () => {
    gatheringAction('stone', 'defence', calculateStonecuttingSkill.value);
};

const gatheringAction = (
    resourceName: keyof UserResources,
    additionalSkill: keyof UserStats,
    calculatedSkill: number,
) => {
    const skillName = gatheringTranslation[resourceName].skill;
    const skillExp = gatheringTranslation[resourceName].skillExp;
    const resources = Math.floor(calculatedSkill * BASE_RESOURCES);
    const experience = Math.floor(BASE_RESOURCE_EXP + resources / 100);

    user.value[additionalSkill] += roundToDecimals(randomBetweenSmall(MIN_SKILL_ADDITION, MAX_SKILL_ADDITION), 5);
    user.value[skillExp] += experience;
    user.value[resourceName] += resources;

    latestGatheringResult.value = {
        type: resourceName,
        resources,
        experience,
    };

    applyExperienceAndLevelUp(skillName, skillExp);
};

const applyExperienceAndLevelUp = (skillName: keyof UserGatheringSkills, skillExp: keyof UserGatheringExp) => {
    if (user.value[skillExp] >= experienceCapForLevel(user.value[skillName])) {
        user.value[skillExp] -= experienceCapForLevel(user.value[skillName]);
        user.value[skillName]++;

        addSuccessToast(capitalizeFirstLetter(skillName) + ' level up!');
        applyExperienceAndLevelUp(skillName, skillExp);
    }
};