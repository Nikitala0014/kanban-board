<template>
  <div class="board-task">
       <div class="board-input">
            <input @keyup.enter="onAddTask" placeholder="example, Family dinner tonight" v-model="value">
        </div>
        <div class="btn_add_cancel">
            <button @click.prevent="onAddTask" class="btn_add_task">Add task</button>
            <button @click.prevent="onClickCancel" class="btn_cancel">Cancel</button>
        </div>
  </div>
</template>

<script>
import shortid from 'shortid'
export default {
    data() {
        return {
            value: '',
        }
    },

    props: ['idRoot'],

    methods: {
        onAddTask() {
            if(!this.maxWeight) {
                this.maxWeight = 1
            }
            this.$emit('add-task', {idRoot: this.idRoot, id: shortid.generate(), task: this.value, weight: 1})
            this.inputTask = ""
        },

        onClickCancel() {
            this.$emit('click-cancel')
        }
    }
}
</script>

<style scoped>
.board-input {
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
}
.btn_add_cancel {
    margin-top: 10px;
}

.btn_add_task {
    border-radius: 8px;
    background-color: rgba(81, 171, 255, 0.8);
    margin-right: 10px;
    color: white;
    padding: 8px;
}

.btn_add_task:hover {
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