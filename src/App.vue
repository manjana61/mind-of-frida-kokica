<template>
  <header>
    <h1>Mind of Frida Kokica</h1>
    <!-- Ovde da vidim mozda za title img. Class da stavim sr-only na h1. -->
    
    <TransitionGroup tag="div" class="game-board" name="shuffle-cards"> <!-- Iskopao na guglu za shuffle karata (TransitionGroup). -->
      <CardComponent
        v-for="card in cardList"
        :key="`${card.value}-${card.variant}`"
        :matched="card.matched"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
      />
    </TransitionGroup>
    <h2>{{ status }}</h2>
    <button @click="restartGame" class="button">
      <img src="/images/restart1.png" alt="Restart Icon">
       Restart Game</button>
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

    let restartGame = () => {
      cardList.value = _.shuffle(cardList.value)

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          visible: false,
          position: index,
        }
      })
    }

    let cardItems = [
      'mom', 
      'eat', 
      'sleep', 
      'poop', 
      'play', 
      'walk', 
      'cat', 
      'popcorn',
    ]

    cardItems.forEach(item => {
      cardList.value.push({
        value: item,
        variant: 1,
        visible: false,
        position: null,
        matched: false,
      })

      cardList.value.push({
        value: item,
        variant: 2,
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
      restartGame,
    }
  },
};
</script>

<style scoped> /* u main.css #app odradjen jedan deo css-a. Nisam uspeo drugacije da ubacim background image za pozadinu. */
* {
  box-sizing: border-box;
  text-align: center;
}

body {
  margin: 0;
  padding: 0;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-column-gap: 24px;
  grid-template-rows: repeat(4, 120px);
  grid-row-gap: 24px;
  justify-content: center;
  text-align: center;
}

.button {
  background-color: #ede31a;
  border: 1px solid blueviolet;
  padding: 0.5rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-weight: bold;
}

.button img {
  padding-right: 5px;
}

h1 { /* ubacicu title img */
  padding-bottom: 30px;
}

.shuffle-cards-move {
  transition: transform 0.8s ease-in;
}
</style>
