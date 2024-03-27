import { createNewUser } from "service/userService";
import { ref } from "vue";
import { initiateCombat } from "../combat/combatService";
import { spawnEnemy } from "helpers/enemySpawner";

export const testUser = ref(createNewUser());
export const enemyLevel = ref(1);

export const runSimulation = (type: 'combat' | 'gathering') => {
    console.log(type)
    if (type === 'combat') {
        console.log(initiateCombat(1, true, spawnEnemy(enemyLevel.value)));
    }
}