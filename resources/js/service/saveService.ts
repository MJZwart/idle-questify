import {ACTION_TIMER, MS_OFFLINE_CUTOFF} from 'assets/variables/progress';
import {initiateCombat, selectedEnemyLevel, startCombat} from '../components/tabs/combat/combatService';
import {addSuccessToast} from '../components/global/toast/toastService';
import {checkUserIntegrity, user} from './userService';
import {actionType, clearActionInterval, startActionInterval} from './activeActionsService';
import {selectedGatheringType, startGathering} from 'components/tabs/resources/gatheringService';

export const startAutosave = (): void => {
    setInterval(saveGame, 300000);
};

export const saveGame = (): void => {
    user.value.lastSave = new Date();
    const objectToSave = {
        user: user.value,
        selectedEnemyLevel: selectedEnemyLevel.value,
        lastAction: actionType.value,
        selectedGatheringType: selectedGatheringType.value,
    };
    localStorage.setItem('questify-save', JSON.stringify(objectToSave));
    addSuccessToast('Game saved!');
};

export const loadGame = (): boolean => {
    clearActionInterval();
    const saveGame = localStorage.getItem('questify-save');
    if (!saveGame) return false;
    const parsedObject = JSON.parse(saveGame);
    user.value = parsedObject.user;
    actionType.value = parsedObject.lastAction;
    selectedEnemyLevel.value = parsedObject.selectedEnemyLevel;
    selectedGatheringType.value = parsedObject.selectedGatheringType;
    calculateOfflineProgress(parsedObject.lastAction);
    checkGameState();
    addSuccessToast('Game loaded!');
    return true;
};

export const checkGameState = (): void => {
    checkUserIntegrity();
    if (actionType.value === 'combat') startCombat();
    if (actionType.value === 'gathering' && selectedGatheringType.value !== null)
        startGathering(selectedGatheringType.value);
};

const calculateOfflineProgress = (action: string) => {
    if (!user.value || action === null) return;
    // Check is last save was more than 10 minutes ago
    const currentTimestamp = new Date().valueOf();
    let lastSave = user.value.lastSave;
    if (typeof lastSave === 'string') lastSave = new Date(lastSave); // Fixes date typing
    if (currentTimestamp - MS_OFFLINE_CUTOFF > lastSave.valueOf()) {
        if (action === 'combat') {
            const actionsPassed = Math.floor((currentTimestamp - lastSave.valueOf()) / ACTION_TIMER);
            initiateCombat(actionsPassed);
        }
    }
};

startActionInterval();
