<template>
  <div class="flex flex-col p-3">
    <table>
      <tr>
        <td>Level:</td>
        <td>{{ character.level }}</td>
      </tr>
      <tr>
        <td>Experience:</td>
        <td>{{ character.experience }}</td>
      </tr>
      <tr>
        <td>Gold:</td>
        <td>{{ character.gold }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { user } from "../service/userService";
const character = user.value.character;
</script>
