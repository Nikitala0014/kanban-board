import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/editor/editor.vue';
import BoardComponent from '@/components/board/board.vue';
import LandingComponent from '@/components/landingPage.vue'
import initState from '@/services/initState'
import store from '@/store/index'
 
Vue.use(Router)

const router = new Router({
 mode: 'history',
 routes: [
   { path: '/today', name: 'today', component: HomeComponent },
   { path: '/board', name: 'board', component: BoardComponent },
   { path: '/', name: 'landing', component: LandingComponent }
 ]
});

router.beforeEach(async (to, from, next) => {
  await initState()
  const isAuth = store.getters.loggedIn
  if(!isAuth && to.path !== '/') {
    next('/')
  } else {
    next()
  }
})

router.beforeEach(async(to, from, next) => {
  await initState()
  const isAuth = store.getters.loggedIn
  if(isAuth && to.path === '/') {
    next('/board')
  } else {
    next()
  }
})

export default router