import {Component, shallowRef} from 'vue';
import Combat from 'components/tabs/combat/Combat.vue';
import Stats from 'components/tabs/stats/Stats.vue';

type Tab = {
    name: string;
    component: Component;
};

const availableTabs = [
    {
        name: 'combat',
        component: Combat,
    },
    {
        name: 'stats',
        component: Stats,
    },
];

export const swapTab = (tabName: string) => {
    const foundTab = availableTabs.find(tab => tab.name === tabName);
    if (!foundTab) return console.error('Tab with name ' + tabName + ' not found');
    activeTab.value = foundTab;
};

export const activeTab = shallowRef<Tab>(availableTabs[0]);
