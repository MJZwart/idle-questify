import {ref} from 'vue';

export type Toast = {
    title: string;
    text: string;
    type: string;
};

export const toasts = ref<Toast[]>([]);

export const addToast = (toast: Toast) => {
    toasts.value?.push(toast);
};

export const addSuccessToast = (text: string) => {
    const toast = {
        title: 'Success',
        text,
        type: 'success',
    };
    addToast(toast);
};

export const removeToast = () => {
    toasts.value.splice(0, 1);
};
