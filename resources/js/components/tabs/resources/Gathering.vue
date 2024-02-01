<template>
    <div class="flex align-center flex-col gap-2">
        <div class="flex gap-1">
            <button @click="startGathering('food')">Farming</button>
            <button @click="startGathering('wood')">Woodcutting</button>
            <button @click="startGathering('metal')">Mining</button>
            <button @click="startGathering('stone')">Stonecutting</button>
        </div>
        <div v-if="isGatheringActive && selectedGatheringType !== null" class="flex align-center flex-col gap-2">
            <button @click="clearActionInterval()">Stop {{ gatheringTranslation[selectedGatheringType].skill }}</button>
            <div v-if="latestGatheringResult">
                You gained {{ latestGatheringResult.resources }} {{ latestGatheringResult.type }} and
                {{ latestGatheringResult.experience }} experience
            </div>
            <ProgressBar
                :value="user[gatheringTranslation[selectedGatheringType].skillExp]"
                :max="experienceCapForLevel(user[gatheringTranslation[selectedGatheringType].skill])"
                :percent="false"
                class="w-100"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {clearActionInterval, isGatheringActive, latestGatheringResult} from 'service/activeActionsService';
import {startGathering, selectedGatheringType, gatheringTranslation} from './gatheringService';
import ProgressBar from 'components/global/ProgressBar.vue';
import {user} from 'service/userService';
import {experienceCapForLevel} from 'helpers/experienceForLevel';
</script>
