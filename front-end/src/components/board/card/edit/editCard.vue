<template>
  <div class="card_edit">
      <div class="edit_input">
          <input @keyup.enter="onEditList" type="text" v-model="name" :id="id" placeholder="Enter a title for the list">
      </div>
      <div class="btn_create">
          <button @click.prevent="onEditList" class="btn_edit_task">Edit list</button>
          <button @click.prevent="onCancel" class="btn_cancel">Cancel</button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.value
    }
  },

  props: [ 'id', 'value' ],

  methods: {
    onEditList() {
      this.$emit('edit-list', {id: this.id, name: this.name})
    },
    onCancel() {
      this.$emit('cancel-edit-list')
    }
  }
}
</script>

<style scoped>
.card_edit {
  width: 100%;
}

.edit_input {
    border: 1px solid rgba(89, 89, 255, 0.4);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.btn_edit_task {
    border-radius: 8px;
    background-color: rgba(81, 171, 255, 0.8);
    margin-right: 10px;
    color: white;
    padding: 8px;
}

.btn_edit_task:hover {
    background-color: rgba(81, 171, 255, 0.6);
    cursor: pointer;
}

.btn_cancel {
    padding: 5px;
    border: 1px solid rgba(89, 89, 255, 0.4);
    border-radius: 5px;
}

.btn_cancel:hover {
    cursor: pointer;
    opacity: 0.7;
}
</style>