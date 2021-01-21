<template>
  <div class="editor">
      <header class="view_header">
          <div class="view_header__content">
              <h1>
                  <span class="simple_content">Today</span>
                  <small class="simple_content__small">Thusday 11 December</small>
              </h1>
              <div class="view_header__actions"></div>
          </div>
      </header>
      <hr v-if="!tasks">
      <div class="view_content">
        <task v-for="task in tasks" :key="task.id" :task="task.task" :id="task.id" @edit-task="onEditTask"></task>
        <div v-if="!isInput" class="add_task">
            <button @click.prevent="onInput" @mouseover="onHover" @mouseout="onNone" class="plus_add_button">
                <span class="add_task_img">
                    <img v-if="!isHover" src="../../assets/svgImg/add.svg"/>
                    <img v-else src="../../assets/svgImg/add_hover.svg"/>
                </span>
                <span class="add_text">Add new task</span>
            </button>
        </div>
        <task-editor v-else @add-task="onAddTask" @click-cancel="onClickCancel"></task-editor>
      </div>
  </div>
</template>

<script>
import TaskEditor from './taskEditor.vue'
import Task from './task.vue'
export default {
    data() {
        return {
            isHover: false,
            isInput: false
        }
    },
    computed: {
        tasks() {
            return this.$store.state.tasks
        },
        loggedIn() {
            return this.$store.getters.loggedIn
        }
    },

    mounted () {
        if(!this.loggedIn) {
            this.$router.push('/')
        }
    },

    components: {TaskEditor, Task},
    methods: {
        onHover() {
            this.isHover = true
        },
        onNone() {
            this.isHover = false
        },
        onInput() {
            this.isInput = true
            this.isHover = false
        },
        onClickCancel() {
            this.isInput = false
        },
        onAddTask(task) {
            this.$store.commit('newTask', task)
            this.isInput = false
        },
        onEditTask() {

        }
    }
}
</script>

<style>
.editor {
    padding: 0 55px;
    margin-top: 45px;
    margin-left: 55px;
    position: relative;
    z-index: 1;
}

.view_header {
    margin: 35px 0 10px;
}

.simple_content {
    font-size: 20px;
    margin-right: 10px;
}
.simple_content__small {
    font-size: 11px; 
    opacity: 0.8;
}

.add_task_img img {
    width: 13px;
    height: 13px;
}

.plus_add_button {
    cursor: pointer;
    font-size: 14px;
    width: 100%;
    text-align: start;
}

.add_text {
    opacity: 0.7;
    margin: 10px;
}
</style>