<template>
  <div class="reg_modal">
      <div class="modal_content">
          <div class="started_reg">
            <p v-if="showError" class="errorLogin">Email or Password incorrect</p>
            <div class="field_input">
                <div class="reg__label">
                    <span>Your email</span>
                </div>
                <div class="reg__input">
                    <input v-model="email" type="email" placeholder="Enter your email.." requred>
                </div>
            </div>
            <div class="field_input">
                <div class="reg__label">
                    <span>Your password</span>
                </div>
                <div class="reg__input">
                    <input v-model="password" type="password" placeholder="Enter your password.." requred>
                </div>
            </div>
            <div class="btn_reg">
                <button @click.prevent="onLogin">Sign in</button>
            </div>
          </div>
          <div>
            <button class="close_modal" @click.prevent="onClose">Close</button>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {server} from '@/utils/helper'
export default {
    data() {
        return {
            email: '',
            password: '',
            showError: false
        }
    },

    methods: {
        onClose() {
            this.showError = false
            this.email = ''
            this.password = ''
            this.$emit('onClose')
        },

        async onLogin() {
            const payloud = {username: this.email, password: this.password}
            await axios.post(`${server.baseUrl}/auth/login`, payloud).then(
                () => {
                    this.$store.dispatch('userLogin', {username: this.email, password: this.password}).then(
                        () => {
                            this.$router.push('/board')
                            this.email = ''
                            this.password = ''
                        }
                    )
                },
                () => {
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

.errorLogin {
    background-color: rgb(255, 185, 185);
}

</style>