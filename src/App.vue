<template>
  <header>
    <h1>Mind of Frida Kokica</h1>
    <div class="game-board">
      <CardComponent
        v-for="(card, index) in cardList"
        :key="index"
        :matched="card.matched"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
      />
    </div>
    <h2>{{ status }}</h2>
    <button @click="restartGame">Restart Game</button>
  </header>
</template>

<script>
import _ from 'lodash'
import { ref, watch, computed } from 'vue'
import CardComponent from "./components/Card-component.vue";

export default {
  name: "App",

  components: {
    CardComponent,
  },

  setup() {
    let cardList = ref([])
    let userSelection = ref([])

    let status = computed(() => {
      if (remainingPairs.value === 0) {
        return 'YOU WIN !'
      } else {
        return `Remaining Pairs : ${remainingPairs.value}`
      }
    })

    let remainingPairs = computed (() => {
      let remainingCards = cardList.value.filter(card => card.matched === false).length

      return remainingCards / 2
    })

    let shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value)
    }

    let restartGame = () => {
      shuffleCards()

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          visible: false,
          position: index,
        }
      })
    }

    let cardItems = [1, 2, 3, 4, 5, 6, 7, 8]

    cardItems.forEach(item => {
      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      })

      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
      })
    })

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      }
    })

    let flipCard = (dataInfo) => { // problem googled.
      cardList.value[dataInfo.position].visible = true
    
      if (userSelection.value[0]) {
        if (userSelection.value[0].position === dataInfo.position && // Had a problem with card matching with itself when I doubleclicked on it. It was a pain in the a**, but after a lot of googling I found a fix.... 
        userSelection.value[0].faceValue === dataInfo.faceValue) {
          return
        } else {
          userSelection.value[1] = dataInfo
        }
      } else {
        userSelection.value[0] = dataInfo
      }
    }

    watch(
      userSelection, 
      (currentValue) => {
      if (currentValue.length === 2) {
        let firstCard = currentValue[0]
        let secondCard = currentValue[1]

        if (firstCard.faceValue === secondCard.faceValue) {
          cardList.value[firstCard.position].matched = true
          cardList.value[secondCard.position].matched = true
        } else {
          setTimeout(() => {
            cardList.value[firstCard.position].visible = false
            cardList.value[secondCard.position].visible = false
          }, 1500)
        }

        userSelection.value.length = 0
      }
    },
      { deep: true } //deep watch (track/watch the deep values inside of watch)? * problem googled.
    )

    return { 
      cardList,
      flipCard,
      userSelection,
      status,
      shuffleCards,
      restartGame,
    }
  },
};
</script>

<style scoped>
* { /* Mozda kasnije samo prepraviti h1 i h2 textalign center */
  box-sizing: border-box;
}

#app { /* Ovde nastaviti i videti sta da radim... Videti da li u main.css sredjivati background image... */
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #dde5f0;
  background-image: url('/images/bg.jpg');
  background-color: antiquewhite;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
