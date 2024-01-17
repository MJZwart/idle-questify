import {ACTION_TIMER, MS_OFFLINE_CUTOFF} from 'assets/variables/progress';
import {initiateCombat, selectedEnemyLevel, startCombat} from './combatService';
import {addSuccessToast} from './toastService';
import {user} from './userService';

export const startAutosave = (): void => {
    setInterval(saveGame, 300000);
};

export const saveGame = (): void => {
    user.value.lastSave = new Date();
    const objectToSave = {
        user: user.value,
        selectedEnemyLevel: selectedEnemyLevel.value,
    };
    localStorage.setItem('questify-save', JSON.stringify(objectToSave));
    addSuccessToast('Game saved!');
};

export const loadGame = (): boolean => {
    const saveGame = localStorage.getItem('questify-save');
    if (!saveGame) return false;
    const parsedObject = JSON.parse(saveGame);
    user.value = parsedObject.user;
    let lastAction = '';
    if (parsedObject.selectedEnemyLevel) {
        selectedEnemyLevel.value = parsedObject.selectedEnemyLevel;
        lastAction = 'combat';
    }
    calculateOfflineProgress(lastAction);
    addSuccessToast('Game loaded!');
    return true;
};

export const checkGameState = (): void => {
    if (selectedEnemyLevel.value !== null) startCombat();
};

const calculateOfflineProgress = (action: string) => {
    if (!user.value) return;
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
