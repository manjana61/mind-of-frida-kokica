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
    <h2>{{userSelection}}</h2>
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
    let userSelection = ref([])

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i,
        visible: false,
        position: i,
      })
    }

    let flipCard = (dataInfo) => {
      cardList.value[dataInfo.position].visible = true /* OVDE JE BILA GLUPA GRESKA PONOVO ........... ] ova zagrada mi je bila posle visible..... */
    
      if (userSelection.value[0]) {
        userSelection.value[1] = dataInfo
      } else {
        userSelection.value[0] = dataInfo
      }
    
    }

    return { 
      cardList,
      flipCard,
      userSelection,
    }
  },
};
</script>

<style scoped>
* { /* Mozda kasnije samo prepraviti h1 i h2 textalign center */
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
