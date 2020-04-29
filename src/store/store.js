import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import db from '@/firebase/init.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: { loggedUser: null },
    getters: { loggedUser: state => state.loggedUser },
    actions: { updateUser: context => context.commit('updateUser') },
    mutations: {
        updateUser(state) {
            const user = firebase.auth().currentUser;
            if(user) {
                state.loggedUser = user.email;
            } else state.loggedUser = null;
          }
    }
});

export default store;