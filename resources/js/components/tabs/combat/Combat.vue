<template>
    <div class="align-center flex flex-col">
        <div>
            <input v-model="selectedEnemyLevel" class="mr-2" />
            <button type="button" @click="startCombat" class="mr-2">Battle</button>
            <button type="button" @click="endCombat">Stop battling</button>
        </div>
        <div class="w-100">
            <ActiveFight />
        </div>
        <div class="flex flex-col align-center" v-if="latestCombatResult">
            <div v-if="latestCombatResult.win" class="align-center flex flex-col">
                <span class="text-success text-bold">Success</span>
                <br />
                <span>
                    You gained {{ parseBigNumbers(latestCombatResult.exp) }} experience and looted
                    {{ parseBigNumbers(latestCombatResult.gold) }} gold.
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
import {parseBigNumbers} from 'helpers/numberHelper';
import ActiveFight from './components/ActiveFight.vue';
import {startCombat, endCombat, latestCombatResult, selectedEnemyLevel} from 'service/combatService';
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
