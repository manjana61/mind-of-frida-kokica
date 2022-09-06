<template>
  <header>
    <h1>Mind of Frida Kokica</h1>
    <div class="game-board">
      <CardComponent
        v-for="(card, index) in cardList"
        :key="card.id"
        :index="index"
        :value="index"
      />
    </div>
  </header>
</template>

<script>
import CardComponent from "./components/Card-component.vue";

export default {
  name: "App",

  components: {
    CardComponent,
  },

  setup() {
    let cardList = [];
    for (let i = 0; i < 16; i++) {
      cardList.push(i);
    }

    return {
      cardList,
    };
  },
};
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
  text-align: center;
}
</style>
