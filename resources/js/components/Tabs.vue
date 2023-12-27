<template>
    <div class="flex flex-row p-3 gap-2">
        <a @click="swapTab('combat')">Combat</a>
        <a @click="swapTab('stats')">Stats</a>
    </div>
</template>

<script setup lang="ts">
import {swapTab} from 'service/tabService';

//
</script>
