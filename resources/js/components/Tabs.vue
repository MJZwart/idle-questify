<template>
    <div class="flex flex-row p-3 gap-2">
        <a v-for="tab in availableTabs" :key="tab.name" @click="swapTab(tab.name)">{{ tab.title }}</a>
        <button class="ml-auto" @click="saveGame">Save game</button>
        <button class="ml-2" @click="loadGame">Load latest</button>
    </div>
</template>

<script setup lang="ts">
import {loadGame, saveGame} from 'service/saveService';
import {swapTab, availableTabs} from 'service/tabService';

//
</script>
