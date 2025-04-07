<template>
    <div flex flex-col w-full bg-body text-body-text gap-3>
        <Tabs panel />
        <!-- <div border border-solid border-black rounded-lg p-4 items-center>
            <ActiveInfo />
        </div> -->
        <div flex flex-row gap-3> 
            <!-- Game panel -->
            <CharacterSheet class="character-sheet" panel />
            <router-view w-full p-6 flex-grow-1 panel />
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
