<template>
    <div class="flex align-center flex-col gap-2">
        <div class="flex gap-1">
            <button @click="startAction('food')">Farming</button>
            <button @click="startAction('wood')">Woodcutting</button>
            <button @click="startAction('metal')">Mining</button>
            <button @click="startAction('stone')">Stonecutting</button>
        </div>
        <div v-if="isGatheringActive && selectedGatheringType !== null" class="flex align-center flex-col gap-2">
            <button @click="stopGathering()">Stop {{ gatheringTranslation[selectedGatheringType].skill }}</button>
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
import {clearActionInterval, isGatheringActive} from 'service/activeActionsService';
import {startGathering, latestGatheringResult, selectedGatheringType, gatheringTranslation} from './gatheringService';
import {UserResources} from 'types/user';
import ProgressBar from 'components/global/ProgressBar.vue';
import {user} from 'service/userService';
import {experienceCapForLevel} from 'helpers/experienceForLevel';

const startAction = (type: keyof UserResources) => {
    startGathering(type);
};

const stopGathering = () => {
    clearActionInterval();
};
</script>
