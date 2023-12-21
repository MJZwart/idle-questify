<template>
  <div class="align-center flex flex-col">
    <div class="buttons">
      <select v-model="selectedEnemy">
        <option v-for="(enemy, idx) in enemies" :key="idx" :value="enemy.id">
          {{ enemy.name }}
        </option>
      </select>
      <button type="button" @click="startFighting">Battle</button>
    </div>
    <div class="fight">Fight</div>
    <div class="results">Results</div>
  </div>
</template>

<script setup lang="ts">
// TODO css
import { enemies } from "assets/lists/enemies";
import { ref } from "vue";

const selectedEnemy = ref(enemies[0]); // TODO Automatically pick selected from last selection

const startFighting = () => {
  console.log("start");
};
</script>

<style lang="scss" scoped></style>
