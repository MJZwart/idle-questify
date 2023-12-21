import { ref } from "vue";
import { User } from "../types/user";
import { Character } from "../types/character";

const createNewUser = (): User => {
    return {
        lastSave: new Date(),
        character: createNewCharacter(),
    }
}

const createNewCharacter = (): Character => {
    return {
        level: 1,
        experience: 0,
        gold: 0,
    }
}

export const user = ref<User>(createNewUser());