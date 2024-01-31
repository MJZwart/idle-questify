import {Component, shallowRef} from 'vue';
import Combat from 'components/tabs/combat/Combat.vue';
import Stats from 'components/tabs/stats/Stats.vue';
import Gathering from 'components/tabs/resources/Gathering.vue';

type Tab = {
    name: string;
    component: Component;
};

export const availableTabs = [
    {
        title: 'Combat',
        name: 'combat',
        component: Combat,
    },
    {
        title: 'Stats',
        name: 'stats',
        component: Stats,
    },
    {
        title: 'Gathering',
        name: 'gathering',
        component: Gathering,
    },
];

export const swapTab = (tabName: string) => {
    const foundTab = availableTabs.find(tab => tab.name === tabName);
    if (!foundTab) return console.error('Tab with name ' + tabName + ' not found');
    activeTab.value = foundTab;
};

export const activeTab = shallowRef<Tab>(availableTabs[0]);
