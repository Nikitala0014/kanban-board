<template>
  <div class="landing">
      <header class="landing_header">
          <div class="logo-work">
              <span>WorkSpace</span>
          </div>
          <div class="btn_sign">
              <button @click.prevent="onModelVisibleSign" class="sign_in btn_header">Sign in</button>
              <button @click.prevent="onModelVisible" class="get_started btn_header">Get started</button>
          </div>
      </header>
      <div class="landing_content">
        <div class="sign">
            <div class="message">
                <span class="description">
                    Organize your workspace <br> and <br> don't forget anything
                </span>
            </div>
            <div class="control">
                <button @click.prevent="onModelVisibleSign" class="sign_in btn_content">Sign in</button>
                <button @click.prevent="onModelVisible" class="get_started btn_content">Get started</button>
            </div>
        </div>
        <div class="illustrate">
            <img src="../assets/img/work.png">
        </div>
      </div>
      <register :class="{visibleTrue: isModal, visibleFalse: !isModal}" @onClose="onCloseModal"></register>
      <sign :class="{visibleTrue: isModalSign, visibleFalse: !isModalSign}" @onClose="onCloseModal"></sign>
  </div>
</template>

<script>
import Register from './appNav/register.vue';
import Sign from './appNav/sign.vue';
export default {
  components: { Register, Sign },
    data() {
      return {
          isModal: false,
          isModalSign: false,
      }
    },

    methods: {
        onModelVisible() {
            this.isModal = true
        },

        onModelVisibleSign() {
            this.isModalSign = true
        },

        onCloseModal() {
            this.isModal = false
            this.isModalSign = false
        }
  },
}
</script>

<style>
.landing {
    display: flex;
    flex-direction: column;
    font-family: 'Roboto Condensed', sans-serif;
}

.landing_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.landing_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.logo-work{
    color: rgba(0, 0, 87, 0.856);
    box-shadow: 0 0 3px rgb(189, 210, 255);
    border-radius: 15px;
    padding: 5px;
    font-size: 42px;
    margin: 30px;
    font-family: 'Noto Sans', sans-serif;
}

.illustrate img {
    width: 800px;
    height: 500px;
}

.sign {
    text-align: center;
}

.message {
    margin-bottom: 30px;
}

.description {
    font-size: 42px;
}

.control {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.sign_in {
    color: white;
    background-color: rgb(100, 180, 255);
    box-shadow: 0 0 5px rgb(189, 210, 255);
    padding: 9px;
    border-radius: 10px;
    cursor: pointer;
    margin: 10px;
    margin-right: 40px;
}

.sign_in:hover, .get_started:hover{
    box-shadow: 0 0 10px rgb(189, 210, 255);
}

.get_started {
    color: rgb(100, 180, 255);
    border: 1px solid rgb(100, 180, 255);
    box-shadow: 0 0 5px rgb(189, 210, 255);
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
}

.btn_header {
    font-size: 14px;
    margin-right: 20px;
}

.btn_content {
    font-size: 18px;
}

.visibleTrue {
    display: block;
}
.visibleFalse {
    display: none
}

</style>