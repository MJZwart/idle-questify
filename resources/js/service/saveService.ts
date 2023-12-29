import {selectedEnemyId, startCombat} from './combatService';
import {user} from './userService';

let autosaveInterval = null;

export const startAutosave = (): void => {
    autosaveInterval = setInterval(saveGame, 300000);
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
    selectedEnemyId.value = parsedObject.selectedEnemyId;
    return true;
};

export const checkGameState = (): void => {
    if (selectedEnemyId !== null) startCombat();
};
