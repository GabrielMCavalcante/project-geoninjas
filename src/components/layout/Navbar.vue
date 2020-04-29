<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{name: 'GMap'}" class="brand-logo left">GeoNinjas!</router-link> 
        <ul class="right">
          
          <li v-if="!loggedUser">
            <router-link :to="{name: 'Signup'}">Sign-up</router-link>
          </li>

          <li v-if="!loggedUser">
            <router-link :to="{name: 'Login'}">Login</router-link>
          </li>

          <li v-if="loggedUser">
            <a>{{loggedUser}}</a>
          </li>
          
          <li v-if="loggedUser">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init.js';

import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['loggedUser'])
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(()=>{
        this.updateUser();
        this.$router.push({name: 'Login'});
      });
    },
    ...mapActions(['updateUser'])
  },
  mounted() {
    this.updateUser();
  }
}
</script>

<style>
  .navbar {
    user-select: none;
  }
  .navbar .container {
    position: relative;
  }
</style>
