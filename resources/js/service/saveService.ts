import {selectedEnemyId, startCombat} from './combatService';
import {user} from './userService';

export const startAutosave = (): void => {
    setInterval(saveGame, 300000);
};

export const saveGame = (): void => {
    user.value.lastSave = new Date();
    const objectToSave = {
        user: user.value,
        selectedEnemyId: selectedEnemyId.value,
    };
    localStorage.setItem('questify-save', JSON.stringify(objectToSave));
    console.log('Game saved');
};

export const loadGame = (): boolean => {
    const saveGame = localStorage.getItem('questify-save');
    if (!saveGame) return false;
    const parsedObject = JSON.parse(saveGame);
    user.value = parsedObject.user;
    let lastAction = '';
    if (parsedObject.selectedEnemyId) {
        selectedEnemyId.value = parsedObject.selectedEnemyId;
        lastAction = 'combat';
    }
    calculateOfflineProgress(lastAction);
    return true;
};

export const checkGameState = (): void => {
    if (selectedEnemyId !== null) startCombat();
};

const calculateOfflineProgress = (action: string) => {
    if (!user.value) return;
    // Check is last save was more than 10 minutes ago
    const currentTimestamp = new Date().valueOf();
    let lastSave = user.value.lastSave;
    if (typeof lastSave === 'string') lastSave = new Date(lastSave); // Fixes date typing
    if (currentTimestamp - 600000 > lastSave.valueOf()) {
        if (action === 'combat') {
            const actionsPassed = Math.floor((currentTimestamp - lastSave.valueOf()) / 3000);
            console.log(actionsPassed);
        }
    }
};
