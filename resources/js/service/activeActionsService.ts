import {ACTION_TIMER} from 'assets/variables/progress';
import {ref, computed} from 'vue';

const activeCombat = ref<NodeJS.Timeout | number>();
export const isCombatActive = computed(() => activeCombat.value !== undefined);

export const clearActiveIntervals = () => {
    clearInterval(activeCombat.value);
};

export const startCombatInterval = (func: () => void) => {
    activeCombat.value = setInterval(func, ACTION_TIMER);
};

export const clearCombatInterval = () => {
    clearInterval(activeCombat.value);
};
