<template>
    <div>
        <table class="stats-table">
            <thead>
                <tr>
                    <th>Stats</th>
                    <th>Base</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in tableRows">
                    <td>{{ row.label }}</td>
                    <td>{{ parseBigNumbers(user[row.variable]) }}</td>
                    <td>{{ parseBigNumbers(user[row.total]) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import {user} from 'service/userService';
import {parseBigNumbers, roundToDecimals} from 'helpers/numberHelper';
import {UserStats} from 'types/user';

type UserStatTable = {
    label: string;
    variable: keyof UserStats;
    total: keyof UserStats;
};

const tableRows = <UserStatTable[]>[
    {
        label: 'Health',
        variable: 'baseHealth',
        total: 'baseHealth',
    },
    {
        label: 'Damage',
        variable: 'damage',
        total: 'damage',
    },
    {
        label: 'Power',
        variable: 'power',
        total: 'power',
    },
    {
        label: 'Hit',
        variable: 'hit',
        total: 'hit',
    },
    {
        label: 'Defence',
        variable: 'defence',
        total: 'defence',
    },
    {
        label: 'Dodge',
        variable: 'dodge',
        total: 'dodge',
    },
    {
        label: 'Critical chance',
        variable: 'criticalChance',
        total: 'criticalChance',
    },
    {
        label: 'Critical damage',
        variable: 'criticalDamage',
        total: 'criticalDamage',
    },
];
</script>

<style lang="scss" scoped>
.stats-table {
    padding: 0.5rem;
    td {
        padding: 0.1rem 0.5rem;
    }
}
</style>
