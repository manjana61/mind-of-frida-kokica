<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <div class="card-side is-front"> <!-- googled the problem with blinking -->
      <!-- {{ value }} -->
      <img :src="`/images/${value}.png`" :alt="value" class="items" />
      <!-- Guglao, Sve sto je trebalo da uradim je bio vbind na src i alt. -->
      <img v-if="matched" src="/images/matching-checkmark.png" class="matching" />
    </div>
    <div class="card-side is-back"></div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  
  props: {
    matched: {
      type: Boolean,
      default: false,
    },   

    position: {
      type: Number,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    visible: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    let flippedStyles = computed(() => {
      if (props.visible) {
        return 'is-flipped'
      }
    })

    let selectCard = () => {
      context.emit('select-card', {
        position: props.position,
        faceValue: props.value,
      })
    }

    return {
      selectCard,
      flippedStyles,
    }
  }
};
</script>

<style scoped>
.card {
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d; /* iskopah na guglu */
}

.card:hover {
  cursor: pointer;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-side {
  width: 100%;
  height: 100%;
  position: absolute;
  border: 1px solid #123C69;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: contain;
  backface-visibility: hidden; /* iskopah na guglu, kako da pozadina elementa koji se rotira ostane sakrivena. */
}

.card-side.is-front {
  background-image: url('/images/front-face-bg.png');
  color: white;
  transform: rotateY(180deg);
}

.card-side.is-back {
  background-image: url('/images/poledjina.png');
  /* background-position: left;
  background-repeat: no-repeat;
  background-size: cover; */
  color: white;
}

.matching {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 30%;
  height: auto;
}

.items {
  /* display: block;
  min-height: 100%;
  min-width: 100%; */
  width: 95%;
  height: 95%;
  object-fit: contain;
}
</style>
