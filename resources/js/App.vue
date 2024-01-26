<template>
    <div class="flex flex-col w-100 gap-3">
        <div>
            <Tabs class="box-border align-center" />
        </div>
        <div class="flex flex-row gap-3">
            <CharacterSheet class="box-border character-sheet" />
            <ActiveAction class="box-border w-100" />
        </div>
    </div>
    <ToastWrapper />
</template>

<script setup lang="ts">
import CharacterSheet from './components/CharacterSheet.vue';
import ActiveAction from './components/ActiveAction.vue';
import Tabs from './components/Tabs.vue';
import ToastWrapper from './components/global/toast/ToastWrapper.vue';
import {onBeforeUnmount, onMounted} from 'vue';
import {loadGame, startAutosave, checkGameState} from 'service/saveService';
import {clearActionInterval} from 'service/activeActionsService';

onMounted(() => {
    console.log('test');
    if (!loadGame()) {
        console.log('No save found, starting new game');
    }
    startAutosave();
    checkGameState();
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
