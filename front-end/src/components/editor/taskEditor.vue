<template>
    <div class="task_editor">
        <div class="task_editor_inp">
                <div class="task_editor__area">
                    <input @keyup.enter="onAddTask" placeholder="example, Family dinner tonight" v-model="inputTask">
                </div>
                <div class="task_editor__fields">
                    <button class="button_editor">
                        <img src="../../assets/svgImg//calendar.svg">
                        <span class="btn_text">Today</span>
                    </button>
                </div>
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
            inputTask: "",
        }
    },

    methods: {
        onAddTask() {
            this.$emit('add-task', {id: shortid.generate(), task: this.inputTask})
            this.inputTask = ""
        },

        onClickCancel() {
            this.$emit('click-cancel')
        }
    }
}
</script>

<style scoped>
.task_editor {
    margin-top: 10px;
}

.task_editor_inp {
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-radius: 10px;
}

input {
    width: 100%;
    margin: 10px 0;
}

.button_editor {
    border: 0.5px solid rgba(0, 0, 0, 0.315);
    border-radius: 8px;
    color: green;
    padding: 5px;
}

.button_editor img {
    width: 12px;
    height: 12px;
    color: green;
}

.btn_text {
    margin-left: 5px;
}

.btn_add_cancel {
    margin-top: 10px;
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