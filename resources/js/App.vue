<template>
    <div class="flex flex-col w-100 gap-3">
        <div>
            <Tabs class="box-border align-center" />
        </div>
        <div class="box-border align-center p-3">
            <ActiveInfo />
        </div>
        <div class="flex flex-row gap-3">
            <CharacterSheet class="box-border character-sheet" />
            <router-view class="box-border w-100 p-3" />
        </div>
    </div>
    <ToastWrapper />
</template>

<script setup lang="ts">
import CharacterSheet from './components/CharacterSheet.vue';
import ActiveInfo from './components/ActiveInfo.vue';
import Tabs from './components/Tabs.vue';
import ToastWrapper from './components/global/toast/ToastWrapper.vue';
import {onBeforeUnmount, onMounted} from 'vue';
import {loadGame, startAutosave, checkGameState} from 'service/saveService';
import {clearActionInterval, startActionInterval} from 'service/activeActionsService';

onMounted(() => {
    if (!loadGame()) {
        console.log('No save found, starting new game');
    }
    startAutosave();
    checkGameState();
    startActionInterval();
});
onBeforeUnmount(() => {
    clearActionInterval();
});
</script>

<style scoped>
.character-sheet {
    min-width: 200px;
}
</style>
