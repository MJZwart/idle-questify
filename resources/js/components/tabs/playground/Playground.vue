<template>
    <div>
        <div class="flex gap-2">
        <button @click="activePlayground = 'combat'">Combat</button>
        <button @click="activePlayground = 'gathering'">Gathering</button>
        <button @click="runSimulation(activePlayground)" class="ml-auto mr-auto">Run simulation</button>
        <button class="ml-auto">Reset</button>
    </div>
        <div class="flex flex-row gap-4">
            <div class="w-50 combat-settings">
                <h3>Settings</h3>
                <CombatSettings v-if="activePlayground === 'combat'" />
                <GatheringSettings v-if="activePlayground === 'gathering'" />
            </div>
            <div class="w-50">
                <h3>Results</h3>
                <CombatResults v-if="activePlayground === 'combat'" />
                <GatheringResults v-if="activePlayground === 'gathering'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CombatSettings from './components/CombatSettings.vue';
import GatheringSettings from './components/GatheringSettings.vue';
import CombatResults from './components/CombatResults.vue';
import GatheringResults from './components/GatheringResults.vue';
import {runSimulation} from './playgroundService';

const activePlayground = ref<'combat' | 'gathering'>('combat');

</script>

<style lang="scss">
.combat-settings {
    td {
        width: 100%;
    }
    input {
        max-width: 100px;
    }
}
</style>