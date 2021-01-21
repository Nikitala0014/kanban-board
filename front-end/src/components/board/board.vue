<template>
  <div class="canvas-board">
    <h2>Canvas board</h2>
    <div class="board-canvas">
      <card v-for="card in cards" :key="card.id" :name="card.name" :id="card.id"></card>
      <div v-if="!isCreate" class="btn_card">
        <button @click.prevent="onCreateCard" class="plus_btn">
            <span class="card_img">
                <img src="../../assets/svgImg//add.svg"/>
            </span>
            <span class="add_text_card">Add new column</span>
        </button>
      </div>
      <card-create v-else @add-list="onAddlistCard" @click-cancel="onCancelCard"></card-create>
    </div>
  </div>
</template>

<script>
import Card from './card/card.vue';
import CardCreate from './card/cardCreate.vue'
export default {
  data() {
    return {
      isCreate: false
    }
  },
  
  computed: {
    cards() {
      return this.$store.getters.allCards
    }
  },

  mounted () {
    this.$store.dispatch('getCards')
    this.$store.dispatch('getTasks')
  },

  components: { CardCreate, Card },

  methods: {
    onCreateCard() {
      this.isCreate = true
    },

    onAddlistCard(card) {
      this.$store.dispatch('addCard', card)
      this.isCreate = false
    },
    onCancelCard() {
      this.isCreate = false
    }
  }
}
</script>

<style scoped>
.canvas-board {
  margin-top: 45px;
  overflow-x: auto;
  overscroll-behavior-x: none;
}

h2 {
  margin-top: 35px;
  margin-left: 55px;
}

.board-canvas {
  display: flex;
  align-items: flex-start;
  height: calc(100vh - 129px);
  margin-left: 45px;
}

.card_img img {
    width: 13px;
    height: 13px;
    margin-left: 10px;
}

.btn_card {
  min-width: 250px;
  margin-top: 5px;
  background-color: rgba(81, 171, 255, 0.5);
  border-radius: 5px;
}
.btn_card:hover {
  background-color: rgba(81, 171, 255, 0.35);
}

.plus_btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    width: 100%;
    text-align: start;
}

.add_text_card {
    opacity: 0.7;
    margin: 10px;
}
</style>