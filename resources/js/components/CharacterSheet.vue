<template>
    <div class="flex flex-col p-3">
        <table>
            <tr>
                <td>Level:</td>
                <td>{{ user.level }}</td>
            </tr>
            <tr>
                <td>Experience:</td>
                <td>{{ user.experience }} / {{ experienceCapForLevel(user.level) }}</td>
            </tr>
            <tr>
                <td>Gold:</td>
                <td>{{ user.gold }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import {experienceCapForLevel} from 'helpers/experienceForLevel';
import {user} from '../service/userService';
</script>
