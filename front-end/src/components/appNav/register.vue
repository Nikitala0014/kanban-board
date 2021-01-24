<template>
  <div class="reg_modal">
      <div class="modal_content">
          <div class="started_reg">
            <p v-if="showError" class="errorReg">User already exists</p>
            <div class="field_input">
                <div class="reg__label">
                    <span>Your name</span>
                </div>
                <div class="reg__input">
                    <input v-model="name" type="email" placeholder="Enter your name..." requred>
                </div>
            </div> 
            <div class="field_input">
                <div class="reg__label">
                    <span>Your email</span>
                </div>
                <div class="reg__input">
                    <input v-model="email" type="email" placeholder="Enter your email..." requred>
                </div>
            </div>
            <div class="field_input">
                <div class="reg__label">
                    <span>Your password</span>
                </div>
                <div class="reg__input">
                    <input v-model="password" type="password" placeholder="Enter your password..." requred>
                </div>
            </div>
            <div class="btn_reg">
                <button @click.prevent="onRegNewUser">Sign up</button>
            </div>
          </div>
          <div>
            <button class="close_modal" @click.prevent="onClose">Close</button>
          </div>
      </div>
  </div>
</template>

<script>
import shortid from 'shortid'
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            showError: false
        }
    },
    methods: {
        onClose() {
            this.showError = false
            this.name = ''
            this.password = ''
            this.email = ''
            this.$emit('onClose')
        },

        async onRegNewUser() {
            const payloud = {userId: shortid.generate(), username: this.email, password: this.password, name: this.name}
            const needToDo = await shortid.generate()
            const inProgress = await shortid.generate()
            const done = await shortid.generate()
            this.$store.dispatch('newUser', payloud).then(
                async () => {
                    this.$store.dispatch('addCard', {id: needToDo, name: 'Need to do'})
                    this.$store.dispatch('addCard', {id: inProgress, name: 'In progress'})
                    this.$store.dispatch('addCard', {id: done, name: 'Done'})

                    await this.$store.dispatch('addTask', {idRoot: needToDo, id: shortid.generate(), task: 'Find great job', weight: 2})
                    await this.$store.dispatch('addTask', {idRoot: inProgress, id: shortid.generate(), task: 'Learn NestJS', weight: 2})
                    await this.$store.dispatch('addTask', {idRoot: inProgress, id: shortid.generate(), task: 'Learn Vuejs', weight: 3})
                    await this.$store.dispatch('addTask', {idRoot: inProgress, id: shortid.generate(), task: 'Learn full stack development', weight: 4})
                    await this.$store.dispatch('addTask', {idRoot: done, id: shortid.generate(), task: 'Make a full stack project', weight: 2})

                    this.$router.push('/board')
                    this.name = ''
                    this.password = ''
                    this.email = ''
                },
                (error) => {
                    console.log('error', error);
                    this.showError = true
                }
            )
        }
    }
}
</script>

<style scoped>

.reg_modal {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.95);
}

.modal_content {
    width: 360px;
    padding: 44px 56px;
    text-align: center;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 0 10px rgb(206, 206, 206);
    border-radius: 30px;
}

.reg__input {
    border-bottom: 1px solid black;
    width: 100%;
    text-align: center;
}

.close_modal {
    cursor: pointer;
}

.field_input {
    margin-bottom: 30px;
}

.btn_reg button {
    background-color: rgb(185, 221, 255);
    border-radius: 6px;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
}

.btn_reg button:hover {
    background-color: rgb(185, 221, 255, 0.6);
}

.errorReg {
    background-color: rgb(255, 185, 185);
}
</style>
