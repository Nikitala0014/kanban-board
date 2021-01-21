<template>
    <div class="card_create">
        <div class="create_input">
            <input @keyup.enter="onAddList" type="text" v-model="header" placeholder="Enter a title for the list">
        </div>
        <div class="btn_create">
            <button @click.prevent="onAddList" class="btn_add_task">Add list</button>
            <button @click.prevent="onClickCancel" class="btn_cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import shortid from 'shortid'
export default {
    data() {
        return {  
            header: ""
        }
    },
    methods: {
        onAddList() {
            this.$emit('add-list', {id: shortid.generate(), name: this.header})
            this.header = ""
        },

        onClickCancel() {
            this.$emit('click-cancel')
        }
    }
}
</script>

<style scoped>
.create_input {
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.card_create {
    width: 250px;
}

.btn_add_task {
    border-radius: 8px;
    background-color: rgb(25, 43, 33);
    margin-right: 10px;
    color: white;
    padding: 8px;
}

.btn_add_task:hover {
    background-color: rgb(25, 43, 33, 0.8);
    cursor: pointer;
}

.btn_cancel {
    padding: 8px;
}

.btn_cancel:hover {
    cursor: pointer;
    opacity: 0.7;
}
</style>