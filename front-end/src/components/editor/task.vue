<template>
    <div v-if="!isEdit" class="main_task">
        <div @mouseover="onHover" @mouseout="onNone" class="main_task_cont">
            <div class="btn_task_check">
                <button class="task_check">
                    <div @mouseover="onHoverCheck" @mouseout="onNoneCheck" class="circle_check">
                        <img :class="{opacityZero: !isCheck}" src="../../assets/svgImg//check.svg">
                    </div>
                    <span class="task_check_text">{{task}}</span>
                </button>
            </div>
            <div class="btn_task_edit">
                <button class="edit_task" @click.prevent="onEditTask">
                    <div class="edit_task_img">
                        <img :class="{opacityZero: !isHover}" src="../../assets/svgImg//pencil.svg">
                    </div>
                </button>
            </div>
        </div>
        <hr class="hr_">
    </div>
</template>

<script>
export default {
    data() {
        return {
            isEdit: false,
            isHover: false,
            isCheck: false
        }
    },
    props: ['task'],
    methods: {
        onEditTask() {
            this.$emit('edit-task')
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
        }
    }
}
</script>

<style>
.main_task_cont {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.main_task_cont:hover {
    cursor: pointer;
}

.task_check {
    display: flex;
    flex-direction: row;
    width: 100%;
    cursor: pointer;
    align-items: center;
}

.task_check_text {
    padding: 0 5px;
}

.circle_check {
    border: 0.5px solid black;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.circle_check:hover{
    background-color: rgba(0, 0, 0, 0.336);

}

.circle_check img {
    width: 12px;
    height: 12px;
}

.circle_check img:hover {
    opacity: 0.7;
}

.opacityZero {
    opacity: 0;
}

.edit_task_img img {
    width: 15px;
    height: 15px;
    cursor: pointer;
}

.edit_task_img:hover {
    background-color: rgba(0, 0, 0, 0.295);
}

.edit_task_img {
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}

.hr_ {
    opacity: 0.3;
}
</style>