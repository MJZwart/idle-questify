import Combat from "components/tabs/combat/Combat.vue";
import Gathering from "components/tabs/resources/Gathering.vue";
import Stats from "components/tabs/stats/Stats.vue";
import Playground from "components/tabs/playground/Playground.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
    {
        path: '/', component: Combat,
    },
    {
        path: '/combat', component: Combat,
    },
    {
        path: '/gathering', component: Gathering,
    },
    {
        path: '/stats', component: Stats,
    },
    {
        path: '/playground', component: Playground,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;