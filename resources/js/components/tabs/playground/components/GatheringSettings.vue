<template>
    <div>
        <div class="gathering-selection mb-3">
            <span>
                <button @click="gatheringType = 'food'">Farming</button>
                <button @click="gatheringType = 'wood'">Woodcutting</button>
            </span>
            <span>
                <button @click="gatheringType = 'metal'">Mining</button>
                <button @click="gatheringType = 'stone'">Stonecutting</button>
            </span>
        </div>
        <table>
            <tbody>
                <tr>
                    <td>Level</td>
                    <td><input type="number" v-model="testUser[gatheringTranslation[gatheringType].skill]" /></td>
                </tr>
                <tr v-if="gatheringType === 'food'">
                    <td>Hit</td>
                    <td><input type="number" v-model="testUser.hit" /></td>
                </tr>
                <tr v-if="gatheringType === 'wood'">
                    <td>Damage</td>
                    <td><input type="number" v-model="testUser.damage" /></td>
                </tr>
                <tr v-if="gatheringType === 'metal'">
                    <td>Power</td>
                    <td><input type="number" v-model="testUser.power" /></td>
                </tr>
                <tr v-if="gatheringType === 'stone'">
                    <td>Defence</td>
                    <td><input type="number" v-model="testUser.defence" /></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { gatheringTranslation } from 'components/tabs/resources/gatheringService';
import { UserResources } from 'types/user';
import { ref } from 'vue';
import {testUser} from '../playgroundService';

const gatheringType = ref<keyof UserResources>('food');
</script>

<style lang="scss" scoped>
.gathering-selection {
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
    span {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }
}
</style>