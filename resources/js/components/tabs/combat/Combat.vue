<template>
    <div class="align-center flex flex-col">
        <div>
            <select v-model="selectedEnemyId" class="mr-2 mb-3">
                <option v-for="(enemy, idx) in enemies" :key="idx" :value="enemy.id">
                    {{ enemy.name }}
                </option>
            </select>
            <button type="button" @click="startCombat" class="mr-2">Battle</button>
            <button type="button" @click="endCombat">Stop battling</button>
        </div>
        <div class="w-100">
            <ActiveFight :chosen-enemy="selectedEnemy" />
        </div>
        <div class="flex flex-col align-center" v-if="latestCombatResult">
            <div v-if="latestCombatResult.win" class="align-center flex flex-col">
                <span class="text-success text-bold">Success</span>
                <br />
                <span>
                    You gained {{ latestCombatResult.exp }} experience and looted {{ latestCombatResult.gold }} gold.
                </span>
            </div>
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
import {enemies} from 'assets/lists/enemies';
import ActiveFight from './components/ActiveFight.vue';
import {startCombat, selectedEnemy, endCombat, latestCombatResult, selectedEnemyId} from 'service/combatService';
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
