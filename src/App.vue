<template>
  <header>
    <h1>Mind of Frida Kokica</h1>
    <div class="game-board">
      <CardComponent
        v-for="(card, index) in cardList"
        :key="index"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
      />
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import CardComponent from "./components/Card-component.vue";

export default {
  name: "App",

  components: {
    CardComponent,
  },

  setup() {
    let cardList = ref([])

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i,
        visible: false,
        position: i,
      })
    }

    let flipCard = (info) => {
      cardList.value[info.position.visible] = true
    }

    return {
      cardList,
      flipCard
    }
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-row-gap: 30px;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
}
</style>
