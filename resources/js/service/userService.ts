import {ref} from 'vue';
import {User} from 'types/user';

const createNewUser = (): User => {
    return {
        lastSave: new Date(),
        level: 1,
        experience: 0,
        gold: 0,

        baseHealth: 100,
        damage: 1,
        power: 1,
        hit: 1,
        defence: 1,
        dodge: 1,
        criticalChance: 1,
    };
};

export const user = ref<User>(createNewUser());
