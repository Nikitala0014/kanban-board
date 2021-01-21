<template>
  <div v-if="!loading" id="app">
    <div v-if="loggedIn && !routeHome">
      <app-nav></app-nav>
      <router-view/>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppNav from './components/appNav/appNav.vue'
export default {
  computed: {
    loggedIn() {
        const status = this.$store.getters.loggedIn
        return status
    },

    loading() {
      return this.$store.getters.loading
    },

    routeHome() {
      if(this.$route.path === '/') {
        return true
      } else {
        return false
      }
    }
  },
  
  name: 'App',
  components: {
    AppNav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body, ul, li {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}

*::before,
*::after {
    box-sizing: border-box;
}

li, ul {
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
}

h1 {
    font-size: 2em;
}

img {
    border-style: none;
}

input {
    outline: none;
    border: none;
    background: none;
}

textarea {
    overflow: hidden;
    outline: none;
    border: none;
    resize: none;
}

hr {
  border: none;
  border-top: 1px solid black;
  opacity: 0.6;
}

strong {
    font-weight: bolder;
}

button {
  outline: none;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
}

</style>
