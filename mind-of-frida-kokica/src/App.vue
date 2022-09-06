<template>
  <header>
    <h1>Mind of Frida Kokica</h1>
    <div class="game-board">
      <Card />
    </div>
  </header>
</template>

<script setup>
import Card from "./components/Card.vue";
</script>

<style scoped>
h1 {
  text-align: center;
}

.card {
  border: 5px solid black;
}

.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-row-gap: 30px;
  justify-content: center;
}
</style>
