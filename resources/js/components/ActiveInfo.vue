<template>
    <div>
        Currently {{ activeActionText }}
    </div>
</template>

<script setup lang="ts">
import {actionType} from 'service/activeActionsService';
import {selectedEnemyLevel} from 'service/combatService';
import {computed} from 'vue';
import {gatheringTranslation, selectedGatheringType} from './tabs/resources/gatheringService';

const activeActionText = computed(() => {
    if (actionType.value === 'combat') return 'fighting a level ' + selectedEnemyLevel.value + ' enemy.';
    if (actionType.value === 'gathering')
        return selectedGatheringType.value !== null
            ? gatheringTranslation[selectedGatheringType.value].skill + '.'
            : 'gathering.';
    return 'doing nothing.';
});
</script>
