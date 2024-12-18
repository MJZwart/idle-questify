<template>
    <div flex flex-col gap-2 h-100 items-center>
        <div flex gap-1>
            <button @click="startGathering('food')">Farming</button>
            <button @click="startGathering('wood')">Woodcutting</button>
            <button @click="startGathering('metal')">Mining</button>
            <button @click="startGathering('stone')">Stonecutting</button>
        </div>
        <div v-if="isGatheringActive && selectedGatheringType !== null" flex flex-col gap-2 items-center>
            <button @click="clearActionInterval()">Stop {{ gatheringTranslation[selectedGatheringType].skill }}</button>
            <div v-if="latestGatheringResult">
                You gained {{ latestGatheringResult.resources }} {{ latestGatheringResult.type }} and
                {{ latestGatheringResult.experience }} experience
            </div>
        </div>
        <ProgressBar 
            v-if="selectedGatheringType !== null"
            :value="user[gatheringTranslation[selectedGatheringType].skillExp]"
            :max="experienceCapForLevel(user[gatheringTranslation[selectedGatheringType].skill])"
            :percent="false"
            :class="selectedGatheringType"
            w-full mt-auto
        />
    </div>
</template>

<script setup lang="ts">
import {clearActionInterval, isGatheringActive, latestGatheringResult} from 'service/activeActionsService';
import {startGathering, selectedGatheringType, gatheringTranslation} from './gatheringService';
import ProgressBar from 'components/global/ProgressBar.vue';
import {user} from 'service/userService';
import {experienceCapForLevel} from 'helpers/experienceForLevel';
</script>

<style lang="scss">
.food {
    .custom-progress-bar {
        background-color: green !important;
    }
}
.wood {
    .custom-progress-bar {
        background-color: sienna !important;
    }
}
.metal {
    .custom-progress-bar {
        background-color: darkslategray !important;
    }
}
.stone {
    .custom-progress-bar {
        background-color: grey !important;
    }
}
</style>