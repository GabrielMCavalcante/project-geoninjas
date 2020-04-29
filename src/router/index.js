import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import GMap from '@/components/home/GMap'
import NotFound from '@/components/home/NotFound'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/map',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(rec=>rec.meta.requiresAuth)) {
      const user = firebase.auth().currentUser;
      if(user) next();
      else {
        alert('You must be logged in');
        next({name: 'Login'});
      }
  } else next();
});

export default router;