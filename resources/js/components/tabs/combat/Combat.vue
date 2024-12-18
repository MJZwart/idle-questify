<template>
    <div flex flex-col items-center>
        <div>
            <input v-model="selectedEnemyLevel" type="number" mr-2 />
            <button type="button" @click="startCombat" mr-2>Battle</button>
            <button type="button" @click="clearActionInterval">Stop battling</button>
        </div>
        <div w-full>
            <ActiveFight />
        </div>
        <div v-if="latestCombatResult" flex flex-col items-center>
            <div v-if="latestCombatResult.win" flex flex-col items-center>
                <span text-green-700 font-semibold>Success</span>
                <br />
                <span>
                    You gained {{ parseBigNumbers(latestCombatResult.exp, 0) }} experience and looted
                    {{ parseBigNumbers(latestCombatResult.gold, 0) }} gold.
                </span>
            </div>
            <span v-else text-red-600 font-semibold>Defeat</span>
            <div>
                <table w-full p-2 text-center class="results-table">
                    <tbody>
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
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {parseBigNumbers} from 'helpers/numberHelper';
import ActiveFight from './components/ActiveFight.vue';
import {startCombat, selectedEnemyLevel} from './combatService';
import {clearActionInterval, latestCombatResult} from 'service/activeActionsService';
</script>

<style lang="scss" scoped>
.results-table {
    tr td {
        min-width: 8rem;
    }
}
</style>