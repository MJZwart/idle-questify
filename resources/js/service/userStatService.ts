import {user} from 'service/userService';
import { User } from 'types/user';
import {computed} from 'vue';

export const calculateHitPoints = computed(() => {
    return user.value.baseHealth;
});

// Base hit chance is 60%. Every point of hit increases it by 1%.
export const calculateHitChance = (user: User) => {
    return user.hit / 100 + 0.6;
};

//
export const calculateDamage = (user: User) => {
    return user.damage;
};

//
export const calculateDefence = (user: User) => {
    return user.defence;
};

export const calculateFarmingSkill = (user: User) => {
    return user.hit * 0.01 + user.farming;
};

export const calculateWoodcuttingSkill = (user: User) => {
    return user.damage * 0.01 + user.woodcutting;
};

export const calculateMiningSkill = (user: User) => {
    return user.power * 0.01 + user.mining;
};

export const calculateStonecuttingSkill = (user: User) => {
    return user.defence * 0.01 + user.stonecutting;
};
