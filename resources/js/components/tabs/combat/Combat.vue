<template>
    <div class="align-center flex flex-col">
        <div>
            <select v-model="selectedEnemyId" class="mr-2 mb-3">
                <option v-for="(enemy, idx) in enemies" :key="idx" :value="enemy.id">
                    {{ enemy.name }}
                </option>
            </select>
            <button type="button" @click="startFighting" class="mr-2">Battle</button>
            <button type="button" @click="stopFighting">Stop battling</button>
        </div>
        <div class="w-100">
            <ActiveFight :chosen-enemy="selectedEnemy" />
        </div>
        <div class="flex flex-col align-center" v-if="latestCombatResult">
            <span v-if="latestCombatResult.win" class="align-center text-success text-bold">Success</span>
            <span v-else class="text-danger text-bold">Defeat</span>
            <div>
                <table class="w-100 results-table">
                    <tr>
                        <td>Rounds</td>
                        <td>{{ latestCombatResult.rounds }}</td>
                    </tr>
                    <tr>
                        <td>Hits</td>
                        <td>{{ latestCombatResult.hits }}</td>
                    </tr>
                    <tr>
                        <td>Misses</td>
                        <td>{{ latestCombatResult.misses }}</td>
                    </tr>
                    <tr>
                        <td>Defends</td>
                        <td>{{ latestCombatResult.defends }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// TODO css
import {enemies} from 'assets/lists/enemies';
import {onUnmounted, ref} from 'vue';
import ActiveFight from './components/ActiveFight.vue';
import {startCombat, selectedEnemy, endCombat, latestCombatResult} from 'service/combatService';

const selectedEnemyId = ref<number | null>(null); // TODO Automatically pick selected from last selection

const startFighting = () => {
    const enemy = enemies.find(enemy => enemy.id === selectedEnemyId.value);
    selectedEnemy.value = enemy ?? null;
    if (!enemy) return;
    startCombat();
};
const stopFighting = () => {
    selectedEnemy.value = null;
    endCombat();
};

onUnmounted(() => {
    endCombat();
});
</script>

<style lang="scss" scoped>
.results-table {
    padding: 0.5rem;
    text-align: center;
    tr td {
        min-width: 8rem;
    }
}
</style>
