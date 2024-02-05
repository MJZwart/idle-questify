import {ACTION_TIMER} from 'assets/variables/progress';
import { GatheringResult } from 'components/tabs/resources/gathering';
import { CombatResult } from 'types/combat';
import {ref, computed} from 'vue';

export type ActionType = 'combat' | 'gathering';

export const activeAction = ref<NodeJS.Timeout | number>();
export const actionType = ref<ActionType | null>(null);
export const activeActionFunction = ref<(() => void) | null>(null);

export const latestGatheringResult = ref<GatheringResult | null>();
export const latestCombatResult = ref<CombatResult | null>();

export const setAction = (func: () => void, type: ActionType) => {
    actionType.value = type;
    activeActionFunction.value = func;
};

export const startActionInterval = () => {
    if (activeActionFunction.value === null || !actionType.value) return;
    clearInterval(activeAction.value);
    activeAction.value = setInterval(activeActionFunction.value, ACTION_TIMER);
};

export const clearActionInterval = () => {
    clearInterval(activeAction.value);
    actionType.value = null;
};

/* Combat */

export const isCombatActive = computed(() => activeAction.value !== undefined && actionType.value === 'combat');

/* Gathering */

export const isGatheringActive = computed(() => activeAction.value !== undefined && actionType.value === 'gathering');

startActionInterval();

