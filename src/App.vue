<template>
  <div class="wrapper">
    <!-- <LoadingImage v-if="!show" /> -->
    <h1>Mind of Frida Kokica</h1>
    <!-- Ovde da vidim mozda za title img. Class da stavim sr-only na h1. -->
    <div class="description">
      <p>Hello hoomans!</p>
      <p>Welcome to my mind. Let's play!</p>
    </div>
    <button v-if="newPlayer" @click="startGame" class="button paw-button">
      <img src="/images/paw-icon.png" alt="Paw Icon"/>
      <!-- <img src="/images/paw-black-icon.png" alt="Paw Dark Icon" class="paw-dark-icon"> -->
      Start Game
    </button>
    <button v-else @click="restartGame" class="button">
      <img src="/images/restart1.png" alt="Restart Icon"/>
       Restart Game
    </button>
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
    <h2 class="status">{{ status }}</h2>
    <footer>
      Design by <a href="https://www.instagram.com/kontigentna/?hl=en" target="_blank">kontigentna</a>
    </footer>
  </div>
</template>

<script>
import _ from 'lodash'
import { ref, watch, computed } from 'vue'
import { launchConfetti } from './utilities/confetti'
import CardComponent from "./components/Card-Component.vue";
/* import LoadingImage from "./components/LoadingImage.vue"; */

export default {
  name: "App",

  components: {
    CardComponent,
    /* LoadingImage, */
},

  setup() {
    let cardList = ref([])
    let userSelection = ref([])
    let newPlayer = ref(true)

    let startGame = () => {
      newPlayer.value = false

      restartGame()
    }

    let status = computed(() => {
      if (matchesFound.value === 8) {
        return 'YOU WIN !'
      } else {
        return `Matches Found: ${matchesFound.value}`
      }
    })

    let matchesFound = computed (() => {
      let matchedCards = cardList.value.filter(card => card.matched === true).length

      return matchedCards / 2
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
        visible: true,
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

    watch(matchesFound, currentValue => {
      if (currentValue === 8) {
        launchConfetti()
      }
    })

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
      newPlayer,
      startGame,
    }
  },
}
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
  grid-column-gap: 12px;
  grid-template-rows: repeat(4, 120px);
  grid-row-gap: 12px;
  justify-content: center;
  text-align: center;
  margin: 20px 0;
}

.description {
  font-family: 'Titillium Web', sans-serif;
}

.description p {
  font-size: 1.1rem;
}

.description p:last-child {
  margin-bottom: 30px;
}

.status {
  font-family: 'Titillium Web', sans-serif;
  text-transform: uppercase;
}

footer a {
  text-decoration: none;
  font-family: 'Gloria Hallelujah', cursive;
  color: blueviolet;
  font-weight: bold;
}

footer a:hover {
  text-decoration: underline;
}

.button {
  background-color: #123C69;
  color: /* #AFD275 */#66FCF1;
  border: 1px solid blueviolet;
  padding: 0.5rem 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  font-size: 1.1rem;
  border-radius: 10px;
  transition: 0.2s all ease-in;
}

.button:hover {
  background-color: /* rgba(18, 60, 105, 0.7); */ rgba(239, 148, 192, 0.7);
  color: #123C69;
  cursor: pointer;
}

/* .button:hover .paw-dark-icon {
  opacity: 1;
}

.button .paw-dark-icon {
  position: absolute;
  left: -6px;
  opacity: 0;
}

.button:hover .paw-icon {
  opacity: 0;
}

.button .paw-icon {
  position: absolute;
  left: -6px;
  opacity: 1;
}

.button-icon {
  position: relative;
  width: 24px;
  height: 24px;
}
.button-icon {
  position: relative;
  width: 24px;
  height: 24px;
} */

.button img {
  padding-right: 5px;
  /* transition: 0.2s opacity ease-in; */
}

/* .paw-button img {
} */

h1 { /* ubacicu title img */
  padding-bottom: 30px;
}

.shuffle-cards-move {
  transition: transform 0.8s ease-in;
}

/* KRECEM ZA tablete */

@media (max-width: 1100px) {
 .game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-column-gap: 10px;
  grid-template-rows: repeat(4, 100px);
  grid-row-gap: 10px;
  justify-content: center;
  text-align: center;
  margin: 20px 0;
}

 h1 {
  font-size: 25px;
  padding-bottom: 25px;
}

.button {
  font-size: 0.9rem;
}

 .description p {
  font-size: 1rem;
}

 .description p:last-child {
  margin-bottom: 25px;
}

 footer {
  font-size: 12px;
 }

 .status {
  font-size: 20px;
 }
}

/* KRECEM ZA fonove */

@media (max-width: 736px) {
  .game-board {
    display: grid;
    grid-template-columns: repeat(4, 80px);
    grid-column-gap: 8px;
    grid-template-rows: repeat(4, 80px);
    grid-row-gap: 8px;
    justify-content: center;
    text-align: center;
    margin: 20px 0;
  }

  h1 {
    font-size: 22px;
    padding-bottom: 18px;
  }

  .button {
    font-size: 0.7rem;
  }

  .description p {
    font-size: 0.8rem;
  }

  .description p:last-child {
    margin-bottom: 20px;
  }

  footer {
    font-size: 11px;
  }

  .status {
    font-size: 18px;
  }

}
</style>
