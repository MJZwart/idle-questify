<template>
    <div>
        <table v-if="chosenEnemy && latestCombatResult" class="active-fight">
            <tr>
                <td>You</td>
                <td>{{ latestCombatResult.enemyName }}</td>
            </tr>
            <tr>
                <td>
                    <ProgressBar :max="calculateHitPoints" :value="parseHealth(latestCombatResult.userHealth)" />
                </td>
                <td>
                    <ProgressBar :max="chosenEnemy.health" :value="parseHealth(latestCombatResult.enemyHealth)" />
                </td>
            </tr>
        </table>
        <div v-else>Choose an enemy to start combat</div>
    </div>
</template>

<script setup lang="ts">
import {calculateHitPoints} from 'service/userStatService';
import ProgressBar from 'components/global/ProgressBar.vue';
import {Enemy} from 'types/enemy';
import {latestCombatResult} from 'service/combatService';
defineProps<{chosenEnemy: Enemy | null}>();

const parseHealth = (health: number) => {
    if (health < 0) return 0;
    return health;
};
</script>

<style lang="scss" scoped>
.active-fight {
    width: 100%;
    tr td {
        width: 50%;
        padding: 0 2rem;
    }
}
</style>
