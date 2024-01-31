import {user} from 'service/userService';
import {computed} from 'vue';

export const calculateHitPoints = computed(() => {
    return user.value.baseHealth;
});

// Base hit chance is 60%. Every point of hit increases it by 1%.
export const calculateHitChance = computed(() => {
    return user.value.hit / 100 + 0.6;
});

//
export const calculateDamage = computed(() => {
    return user.value.damage;
});

//
export const calculateDefence = computed(() => {
    return user.value.defence;
});

export const calculateFarmingSkill = computed(() => {
    return user.value.hit * 0.01 + user.value.farming;
});

export const calculateWoodcuttingSkill = computed(() => {
    return user.value.damage * 0.01 + user.value.woodcutting;
});

export const calculateMiningSkill = computed(() => {
    return user.value.power * 0.01 + user.value.mining;
});

export const calculateStonecuttingSkill = computed(() => {
    return user.value.defence * 0.01 + user.value.stonecutting;
});
