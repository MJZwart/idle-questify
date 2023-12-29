<template>
    <div class="flex flex-row p-3 gap-2">
        <a @click="swapTab('combat')">Combat</a>
        <a @click="swapTab('stats')">Stats</a>
        <button class="ml-auto" @click="saveGame">Save game</button>
    </div>
</template>

<script setup lang="ts">
import {saveGame} from 'service/saveService';
import {swapTab} from 'service/tabService';

//
</script>
