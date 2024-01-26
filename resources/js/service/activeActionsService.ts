import {ACTION_TIMER} from 'assets/variables/progress';
import {ref, computed} from 'vue';

type ActionType = 'combat' | 'gathering' | 'none';

const activeAction = ref<NodeJS.Timeout | number>();
export const actionType = ref<ActionType>('none');

export const startActionInterval = (func: () => void, type: ActionType) => {
    console.log('Starting action type ', type);
    clearActionInterval();
    activeAction.value = setInterval(func, ACTION_TIMER);
    actionType.value = type;
};

export const clearActionInterval = () => {
    clearInterval(activeAction.value);
    actionType.value = 'none';
};

/* Combat */

export const isCombatActive = computed(() => activeAction.value !== undefined && actionType.value === 'combat');

/* Gathering */

export const isGatheringActive = computed(() => activeAction.value !== undefined && actionType.value === 'gathering');
