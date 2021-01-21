<template>
    <div ref="task" v-if="!isEdit" draggable="true" @mouseover="onHover" @mouseout="onNone" class="main_task_card" :id="id" @dragleave.prevent="onLeave" @dragenter.prevent="onEnter" @drop.prevent="onDrop">
        <div class="btn_task_check_card">
            <button @click.prevent="onCheckTask" class="task_check_card">
                <div @mouseover="onHoverCheck" @mouseout="onNoneCheck" class="circle_check_card">
                    <img :class="{opacityZero: !isCheck}" src="../../../assets/svgImg/check.svg">
                </div>
                <span class="task_check_text_card">{{task}}</span>
            </button>
        </div>
        <div class="btn_task_edit_card">
            <button class="edit_task_card" @click.prevent="onEditOpen">
                <div class="edit_task_img_card">
                    <img :class="{opacityZeroCard: !isHover}" src="../../../assets/svgImg/pencil.svg">
                </div>
            </button>
        </div>
    </div>
    <edit-task v-else :id="id" :value="task" @edit-task="onEditTask" @cancel-edit-task="onCancelEditTask"></edit-task>
</template>

<script>
import editTask from './edit/editTask.vue'
export default {
  components: { editTask },
    data() {
        return {
            isEdit: false,
            isHover: false,
            isCheck: false,
            counter: 0,
            idTask: ''
        }
    },
    props: [ 'task', 'id' ],
    methods: {
        onEnter(event) {
            console.log('id task', this.idTask);
            const currentElement = event.target
            if(currentElement.classList.contains('main_task_card') || currentElement.closest('.main_task_card')) {
                this.counter++
                if (currentElement.classList.contains('main_task_card')) {
                    const id = currentElement.id
                    if (id !== this.idTask && this.idTask !== '') {
                        const hovered = document.querySelector('.hovered')
                        if(hovered) {
                            hovered.classList.remove('hovered')
                            return
                        }
                        return
                    } else {
                        this.idTask = id
                        currentElement.classList.add('hovered')
                    }
                } else {
                    const parent = currentElement.closest('.main_task_card')
                    const id = parent.id
                    if (id !== this.idTask && this.idTask !== '') {
                        const hovered = document.querySelector('.hovered')
                        if(hovered) {
                            hovered.classList.remove('hovered')
                            return
                        }
                        return
                    }
                     else {
                        this.idTask = id
                        parent.classList.add('hovered')
                    }
                }

            } else if(currentElement.classList.contains('task-list')) {
                const hovered = document.querySelector('.hovered')
                if(hovered) {
                    hovered.classList.remove('hovered')
                }
            }
        },

        onLeave(event) {
            this.counter--
            if(this.counter === 0) {
                const element = event.target
                if(this.idTask === element.id) {
                    element.classList.remove('hovered')
                }
                if(this.idTask === element.closest('.main_task_card').id) {
                    element.closest('.main_task_card').classList.remove('hovered')
                }
                const hovered = document.querySelector('.hovered')
                if(hovered) {
                    hovered.classList.remove('hovered')
                }
            }
        },

        onDrop() {
            console.log('drop');
            const id_ = event.dataTransfer.getData('text')
            const element = document.getElementById(id_)
            const currentElement = event.target
            const idRoot = currentElement.closest('.card-wrapper').id
            const idTaskRoot = element.closest('.card-wrapper').id
            if (currentElement.classList.contains('main_task_card') || currentElement.closest('.main_task_card')) {
                element.className = 'main_task_card'

                if (currentElement.classList.contains('main_task_card')) {
                    const idCurrent = currentElement.id
                    currentElement.classList.remove('hovered')
                    this.$store.dispatch('dragnDrop', {idTask: id_,  idCurrent: idCurrent, idRoot: idRoot, idTaskRoot}).then(() => {this.$store.dispatch('getTasks')})
                    currentElement.insertAdjacentElement('beforebegin', element)
                } else {
                    const parent = currentElement.closest('.main_task_card')
                    const idCurrent = parent.id
                    this.$store.dispatch('dragnDrop', {idTask: id_,  idCurrent: idCurrent, idRoot: idRoot, idTaskRoot}).then(() => {this.$store.dispatch('getTasks')})
                    parent.classList.remove('hovered')
                    parent.insertAdjacentElement('beforebegin', element)
                }
            }
        },

        onCheckTask() {
            this.$store.dispatch('removeTask', this.id)
        },

        onEditOpen() {
            this.isEdit = true
        },

        onEditTask(payloud) {
            console.log('edit task', payloud);
            this.$store.dispatch('editTask', payloud)
            this.isEdit = false
        },

        onCancelEditTask() {
            this.isEdit = false
        },

        onHover() {
            this.isHover = true
        },

        onNone() {
            this.isHover = false
        },

        onHoverCheck() {
            this.isCheck = true
        },

        onNoneCheck() {
            this.isCheck = false
        },
        isFalse() {
            return false
        }
    }
}
</script>

<style scoped>
.main_task_card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 6px;
    width: 100%;
    cursor: move;
    border-radius: 5px;
    box-shadow: 0 0 3px rgb(189, 210, 255, .6);
}

.main_task_card:hover {
    box-shadow: 0 0 5px rgb(189, 210, 255, .85);
}

.task_check_card {
    pointer-events: none;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    align-items: center;
}

.task_check_text_card {
    pointer-events: none;
    padding: 0 5px;
    text-align: start;
}

.circle_check_card {
    border: 1px solid rgba(0, 0, 0, 0.493);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.circle_check_card:hover{
    background-color: rgba(0, 0, 0, 0.336);

}

.circle_check_card img {
    width: 12px;
    height: 12px;
}

.circle_check_card img:hover {
    opacity: 0.7;
}

.opacityZeroCard {
    opacity: 0;
}

.edit_task_img_card img {
    width: 15px;
    height: 15px;
    cursor: pointer;
}

.edit_task_img_card:hover {
    background-color: rgba(0, 0, 0, 0.295);
}

.edit_task_img_card {
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}

.hovered {
    opacity: 0.6;
    border: 1px solid rgb(89, 89, 255);
}
</style>