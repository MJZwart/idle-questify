<template>
    <div class="custom-toast">
        <div class="custom-toast-sidebar" :class="toast.type ?? 'info'" />
        <div class="custom-toast-content">
            <div class="custom-toast-header">
                <h4>{{ toast.title }}</h4>
                <button @click="dismissToast">X</button>
            </div>
            <div class="text">
                {{ toast.text }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {removeToast, Toast} from './toastService.ts';

onMounted(() => {
    setTimeout(() => {
        dismissToast();
    }, 5000);
});

defineProps<{toast: Toast}>();

const dismissToast = () => {
    removeToast();
};
</script>

<style lang="scss" scoped>
@import 'assets/scss/_variables.scss';
.success {
    background-color: #009900;
}
.info {
    background-color: #009999;
}
.error {
    background-color: #990000;
}
.custom-toast {
    color: #2c3e50;
    width: 200px;
    min-height: 50px;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
    padding: 0.8rem;
    background-color: white;
    border-top-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 25%);

    p {
        margin-top: 3px;
        margin-bottom: 3px;
    }
    .custom-toast-sidebar {
        width: 0.5rem;
    }
    .custom-toast-content,
    .custom-toast-header {
        width: 100%;
        display: flex;
        h4 {
            margin-top: 0;
        }
    }
    .custom-toast-content {
        flex-direction: column;
        padding-left: 1rem;
        box-sizing: border-box;
    }
    .custom-toast-header {
        height: 15px;
        margin-bottom: 1rem;
    }
    button {
        margin-left: auto;
        border: none;
        cursor: pointer;
        background: none;
        color: $primary;
        height: fit-content;
        padding-bottom: 3px;
        border-radius: 0.2rem;
    }
}

@media (max-width: 350px) {
    .custom-toast {
        width: 200px;

        p {
            font-family: var(--light-font);
            font-size: small;
        }
        .custom-toast-sidebar {
            width: 0.5rem;
        }
        .custom-toast-content {
            padding-left: 0.5rem;
        }
        .custom-toast-header {
            height: 5px;
        }
    }
}
</style>