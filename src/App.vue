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
      /> <!-- Da li je ok ovako da hvata event? Ovaj event sam definisao u Card-Component.vue -->
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

  setup() { /* Ovde sam ubacio setup() function */
    let cardList = ref([])

    for (let i = 0; i < 16; i++) {
      cardList.value.push({ /* Da li sam ovde okej iskucao? */
        value: i,
        visible: false,
        position: i,
      })
    }

    let flipCard = (info) => {
      cardList.value[info.position].visible = true /* OVDE JE BILA GLUPA GRESKA PONOVO ........... ] ova zagrada mi je bila posle visible..... */
    }

    return { /* Na netu sam nasao na vuejs.org da kad koristim setup() da moram da imam return. */
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
