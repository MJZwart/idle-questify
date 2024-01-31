<template>
    <div class="flex flex-col p-3">
        <table>
            <tr>
                <td>Level:</td>
                <td>{{ user.level }}</td>
            </tr>
            <tr>
                <td>Experience:</td>
                <td>
                    {{ parseBigNumbers(user.experience, 0) }} /
                    {{ parseBigNumbers(experienceCapForLevel(user.level), 0) }}
                </td>
            </tr>
            <tr>
                <td>Gold:</td>
                <td>{{ parseBigNumbers(user.gold, 0) }}</td>
            </tr>
            <tr>
                <td colspan="2"><hr /></td>
            </tr>
            <tr>
                <td colspan="2"><b>Gathering levels</b></td>
            </tr>
            <tr>
                <td>Farming:</td>
                <td>
                    {{ user.farming }}
                </td>
            </tr>
            <tr>
                <td>Woodcutting:</td>
                <td>
                    {{ user.woodcutting }}
                </td>
            </tr>
            <tr>
                <td>Mining:</td>
                <td>
                    {{ user.mining }}
                </td>
            </tr>
            <tr>
                <td>Stonecutting:</td>
                <td>
                    {{ user.stonecutting }}
                </td>
            </tr>
            <tr>
                <td colspan="2"><hr /></td>
            </tr>
            <tr>
                <td colspan="2"><b>Resources</b></td>
            </tr>
            <tr>
                <td>Food:</td>
                <td>
                    {{ parseBigNumbers(user.food, 0) }}
                </td>
            </tr>
            <tr>
                <td>Wood:</td>
                <td>
                    {{ parseBigNumbers(user.wood, 0) }}
                </td>
            </tr>
            <tr>
                <td>Metal:</td>
                <td>
                    {{ parseBigNumbers(user.metal, 0) }}
                </td>
            </tr>
            <tr>
                <td>Stone:</td>
                <td>
                    {{ parseBigNumbers(user.stone, 0) }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import {experienceCapForLevel} from 'helpers/experienceForLevel';
import {user} from '../service/userService';
import {parseBigNumbers} from 'helpers/numberHelper';
</script>
