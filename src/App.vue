<template>
  <div class="flex flex-col w-100 gap-3">
    <div>
      <Tabs class="box-border tabs-component" />
    </div>
    <div class="flex flex-row gap-3">
      <CharacterSheet class="box-border character-sheet" />
      <ActiveAction class="box-border w-100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterSheet from "./components/CharacterSheet.vue";
import ActiveAction from "./components/ActiveAction.vue";
import Tabs from "./components/Tabs.vue";
</script>

<style scoped>
.character-sheet {
  min-width: 200px;
}
.tabs-component {
  align-items: center;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
