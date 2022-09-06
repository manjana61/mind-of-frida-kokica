<template>
  <header>
    <h1>Mind of Frida Kokica</h1>
    <div class="game-board">
      <CardComponent
        v-for="(card, index) in cardList"
        :key="index"
        :value="card.value"
        :visible="card.visible"
      />
      <!-- 1. Ovde mi nije jasno kako da povezem sa brojem 2. Gledao sam snimke i guglao, ali nisam resio problem. Verovatno sam nesto izostavio, ili neka glupa greska.-->
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

  data() {
    let cardList = [];

    for (let i = 0; i < 16; i++) {
      cardList.push({
        value: i,
        visible: true, //Ovo je broj 2. Znaci, zelim da kada mi je vrednost od visible true, da mi kartice budu crvene (znaci licem na gore), a kada je vrednost false da budu licem na dole.
      });
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
