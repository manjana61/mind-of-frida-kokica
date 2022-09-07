<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-side is-front">{{ value }}</div>
    <div v-else class="card-side is-back">Back</div>
  </div>
</template>

<script>
export default {
  
  props: {
    position: {
      type: Number,
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },

    visible: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    let selectCard = () => {
      context.emit('select-card', {
        position: props.position,
      })
    }

    return {
      selectCard
    }
  }
};
</script>

<style scoped>
.card {
  border: 5px solid gray;
  position: relative;
}

.card-side {
  width: 100%;
  height: 100%;
  position: absolute;
}
.card-side.is-front {
  background-color: red;
  color: white;
}

.card-side.is-back {
  background-color: blue;
  color: white;
}
</style>
