<template>
    <div>
        <table>
            <tbody>
                <tr>
                    <td>Level</td>
                    <td><input type="number" v-model="testUser.level" /></td>
                </tr>
                <tr>
                    <td>Enemy Level</td>
                    <td><input type="number" v-model="enemyLevel" /></td>
                </tr>
                <tr>
                    <td colspan="2"><hr /></td>
                </tr>
                <tr>
                    <td>Damage</td>
                    <td><input type="number" v-model="testUser.damage" /></td>
                </tr>
                <tr>
                    <td>Power</td>
                    <td><input type="number" v-model="testUser.power" /></td>
                </tr>
                <tr>
                    <td>Hit</td>
                    <td><input type="number" v-model="testUser.hit" /></td>
                </tr>
                <tr>
                    <td>Defence</td>
                    <td><input type="number" v-model="testUser.defence" /></td>
                </tr>
                <tr>
                    <td>Dodge</td>
                    <td><input type="number" v-model="testUser.dodge" /></td>
                </tr>
                <tr>
                    <td>Critical Chance</td>
                    <td><input type="number" v-model="testUser.criticalChance" /></td>
                </tr>
                <tr>
                    <td>Critical Damage</td>
                    <td><input type="number" v-model="testUser.criticalDamage" /></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import {testUser, enemyLevel} from '../playgroundService';
</script>