<template>
    <div class="custom-progress">
        <span class="progress-bar-text">
            {{ percent ? parseValue + '%' : parseBigNumbers(value, 0) + '/' + parseBigNumbers(max, 0) }}
        </span>
        <div
            class="custom-progress-bar"
            role="progressbar"
            aria-valuemin="0"
            :aria-valuemax="max"
            :aria-valuenow="value"
            :style="widthValue"
        ></div>
    </div>
</template>

<script setup lang="ts">
import {parseBigNumbers} from 'helpers/numberHelper';
import {computed} from 'vue';
const props = defineProps<{value: number; max: number; percent: boolean}>();
const widthValue = computed(() => {
    return {width: (100 * props.value) / props.max + '%'};
});
const parseValue = computed(() => ((100 * props.value) / props.max).toFixed(2));
</script>

<style lang="scss" scoped>
@import 'assets/scss/_variables.scss';
.custom-progress {
    display: flex;
    height: 1.5rem;
    overflow: hidden;
    background-color: $primary;
    border-radius: 0.5rem;
    position: relative;

    .custom-progress-bar {
        background-color: $secondary;
        transition: width 0.6s ease;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
    .progress-bar-text {
        color: black;
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
        z-index: 100;
    }
}
</style>
