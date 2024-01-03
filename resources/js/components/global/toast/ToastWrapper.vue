<template>
    <div v-if="toasts.length" class="custom-toasts-wrapper">
        <Toast v-for="(toast, index) of toasts" :key="index" :toast="toast" />
    </div>
</template>

<script setup lang="ts">
import Toast from './Toast.vue';
import {toasts} from 'service/toastService.ts';
</script>

<style lang="scss" scoped>
.custom-toasts-wrapper {
    width: 250px;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 1060;
}
@media (max-width: 350px) {
    .custom-toasts-wrapper {
        width: 200px;
    }
}
</style>
