<template>
    <div class="p-3">
        <component :is="activeTab?.component" />
    </div>
</template>

<script setup lang="ts">
import {activeTab} from '../service/tabService';
</script>