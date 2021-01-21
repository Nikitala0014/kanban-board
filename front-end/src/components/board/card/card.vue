<template>
  <div :id="id" class="card-wrapper">
    <header>
        <div v-if="!isEdit" class="card-header">
            {{name}}
            <div class="more-card">
                <button class="card-edit">
                    <img src="../../../assets/svgImg/more.svg">
                </button>
                <div class="more-card-content">
                    <ul>
                        <li @click.prevent="onEditCard">Edit card</li>
                        <li @click.prevent="onDeleteCard">Delete card</li>
                    </ul>
                </div>
            </div>
        </div>
        <edit-card v-else @edit-list="onEditList" @cancel-edit-list="onCancelEdit" :id="id" :value="name"></edit-card>
    </header>
    <div ref="taskList" @dragleave.prevent="onLeaveList" @dragenter.prevent="onEnterList" @drop.prevent="onDropList" @dragstart="onStart" @dragend="onEnd" @dragover.prevent="onOver" class="task-list">
        <task-card ref="taskCard" v-for="task in tasks" :key="task.id" :task="task.task" :id="task.id"></task-card>
    </div>
    <div v-if="!isInput" class="add_task_card">
        <button @click.prevent="onInput" @mouseover="onHover" @mouseout="onNone" class="plus_add_button_card">
            <span class="add_task_img_card">
                <img v-if="!isHover" src="../../../assets/svgImg/add.svg"/>
                <img v-else src="../../../assets/svgImg/add_hover.svg"/>
            </span>
            <span class="add_text_card">Add new task</span>
        </button>
    </div>
    <board-task v-else @add-task="onAddTask" @click-cancel="onClickCancel" :idRoot="id"></board-task>
  </div>
</template>

<script>
import BoardTask from './boardTask.vue'
import EditCard from './edit/editCard.vue'
import TaskCard from './taskCard.vue'
export default {
  data() {
    return {
      isHover: false,
      isInput: false,
      isEdit: false,
      isDrag: false,
      isOver: false,
    }
  },

  computed: {
      headerValue: function() {
          return this.name
      },
      tasks() {
          const tasksList = this.$store.getters.getTasks(this.id)
          return tasksList
      },
      isTasks() {
          if(this.tasks.length === 0) {
              return true
          } else {
              return false
          }
      }
  },

  props: [ 'name', 'id' ],

  components: {TaskCard, BoardTask, EditCard},

  methods: {
    onStart(event) {
        this.isDrag = true
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text', event.target.id)

        const taskElement = event.target
        console.log('taskElement', taskElement);
        
        taskElement.classList.add('hold')
        setTimeout(() => {taskElement.className = 'invisible'}, 0)
    },

    onEnd() {
        const taskElement = this.$refs.taskCard[0].$el
        taskElement.className = 'main_task_card'
        const invisibleEl = document.querySelector('.invisible')
        if(invisibleEl) {
            invisibleEl.className = 'main_task_card'
        }
    },

    onOver() {
        return
    },

    onEnterList(event) {
        const element = event.target
        if(element.classList.contains('task-list')) {
            const wrap = element.closest('.card-wrapper')
            wrap.classList.add('hoveredEmpty')
        }
    },
    onLeaveList(event) {
        const element = event.target
        const wrap = element.closest('.card-wrapper')
        if (wrap) {
            if (wrap.classList.contains('hoveredEmpty')) {
                wrap.classList.remove('hoveredEmpty')
            }
        }
    },

    onDropList(event) {
        const element = event.target
        const wrap = element.closest('.card-wrapper')
        if (wrap) {
            if (wrap.classList.contains('hoveredEmpty')) {
                wrap.classList.remove('hoveredEmpty')
            }
        }
        const id_ = event.dataTransfer.getData('text')
        const currentElement = event.target
        if(currentElement.classList.contains('task-list')) {
            const idRoot = currentElement.closest('.card-wrapper').id
            this.$store.dispatch('dragnDrop', {idTask: id_,  idCurrent: 0, idRoot: idRoot, idTaskRoot: 0})
        }
    },

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
        this.$store.dispatch('addTask', task)
        this.isInput = false
    },

    onEditCard() {
        this.isEdit = true
    },

    onDeleteCard() {
        this.$store.dispatch('deleteCard', this.id)
    },

    onEditList(editedCard) {
        this.$store.dispatch('updateCard', editedCard)
        this.isEdit = false
    },

    onCancelEdit() {
        this.isEdit = false
    }
  }
}
</script>

<style>
.card-wrapper {
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
  padding: 10px;
  max-width: 260px;
  min-width: 260px;
  max-height: 100%;
  margin-right: 12px;
  flex-shrink: 0;
  flex-grow: 1;
  box-shadow: 0 0 5px rgb(189, 210, 255);
  border-radius: 5px;
}

.card-wrapper:hover {
    box-shadow: 0 0 7px rgb(189, 210, 255);
    cursor: move;
}

.card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.task-list {
    width: 100%;
    min-height: 50px;
    margin: 10px 0;
    border-radius: 5px
}

.more-card {
    display: inline-block;
}

.more-card-content {
    display: none;
    position: absolute;
}

.more-card-content ul{
    position: relative;
    background-color: #fff;
    border-collapse: separate;
    border-radius: 3px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 8px 0 rgba(0,0,0,.08);
    list-style: none;
    margin: 0;
    padding: 4px 0;
    position: relative;
    width: 250px;
    z-index: 12;
}

.more-card-content li:hover {
    cursor: pointer;
}

.more-card:hover .more-card-content {
    display: block;
}

.card-edit {
    width: 20px;
    height: 20px;
    border-radius: 2px;
}

.card-edit:hover {
    cursor: pointer;
    box-shadow: 0 0 3px rgb(184, 184, 184);
}

.add_task_card {
    margin: 10px 0;
    padding: 5px;
}

.add_task_img_card img {
    width: 13px;
    height: 13px;
}

.plus_add_button_card {
    cursor: pointer;
    font-size: 14px;
    width: 100%;
    text-align: start;
}

.add_text_card {
    opacity: 0.7;
    margin: 10px;
}

.visible {
    min-height: 38px;
}

.hold {
    background-color: rgb(231, 231, 231)
}

.invisible {
    display: none;
}

.hoveredEmpty {
    border: 1px solid rgb(89, 89, 255);
}
</style>