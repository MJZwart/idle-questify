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
</template>

<script setup lang="ts">
import CharacterSheet from './components/CharacterSheet.vue';
import ActiveAction from './components/ActiveAction.vue';
import Tabs from './components/Tabs.vue';
import {onMounted} from 'vue';
import {loadGame, startAutosave, checkGameState} from 'service/saveService';
onMounted(() => {
    if (!loadGame()) {
        console.log('No save found, starting new game');
    }
    startAutosave();
    checkGameState();
});
</script>

<style scoped>
.character-sheet {
    min-width: 200px;
}
</style>
