<template>
    <div class="flex flex-row p-3 gap-2">
        <router-link v-for="link in availableLinks" :to="link.name">{{ link.title }}</router-link>
        <button class="ml-auto" @click="saveGame">Save game</button>
        <button class="ml-2" @click="loadGame">Load latest</button>
    </div>
</template>

<script setup lang="ts">
import {loadGame, saveGame} from 'service/saveService';

const availableLinks = [
    {
        title: 'Combat',
        name: 'combat',
    },
    {
        title: 'Stats',
        name: 'stats',
    },
    {
        title: 'Gathering',
        name: 'gathering',
    },
];
</script>