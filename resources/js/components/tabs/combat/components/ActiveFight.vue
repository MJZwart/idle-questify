<template>
    <div>
        <table v-if="isCombatActive && latestCombatResult && selectedEnemy" class="active-fight">
            <tr>
                <td>You</td>
                <td>{{ latestCombatResult.enemy.name }}</td>
            </tr>
            <tr>
                <td>
                    <ProgressBar :max="calculateHitPoints" :value="parseHealth(latestCombatResult.userHealth)" />
                </td>
                <td>
                    <ProgressBar :max="latestCombatResult.enemyMaxHealth" :value="parseHealth(latestCombatResult.enemyHealth)" />
                </td>
            </tr>
        </table>
        <div v-else>Choose an enemy to start combat</div>
    </div>
</template>

<script setup lang="ts">
import {calculateHitPoints} from 'service/userStatService';
import ProgressBar from 'components/global/ProgressBar.vue';
import {selectedEnemy, selectedEnemyLevel} from '../combatService';
import {isCombatActive, latestCombatResult} from 'service/activeActionsService';
import {onMounted} from 'vue';

const parseHealth = (health: number) => {
    if (health < 0) return 0;
    return health;
};

onMounted(() => {
    if (isCombatActive && !selectedEnemy) {
        selectedEnemyLevel.value = latestCombatResult.value?.enemy.id;
    }
});
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
