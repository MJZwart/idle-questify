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
