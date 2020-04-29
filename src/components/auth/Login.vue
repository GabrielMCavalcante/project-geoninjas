<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel" @keyup="toggleFeedback">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="youremail@example.com" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="a1bc23de45" v-model="password" />
      </div>
      <p v-if="feedback" class="center deep-purple darken-2 white-text feedback">{{feedback}}</p>
      <div v-if="loggingIn" class="field center">
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="field center">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import {mapActions} from 'vuex';
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      loggingIn: false
    };
  },
  methods: {
    toggleFeedback(e) {
      this.feedback = e.key !== "Enter" ? null : this.feedback;
    },
    ...mapActions(['updateUser']),
    login() {
      if (this.email && this.password) {
        this.loggingIn = true;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.loggingIn = false;
            this.updateUser();
            this.$router.push({name: 'GMap'});
          }).catch(err => {
            this.loggingIn = false;
            console.log("There has been an error: ", err.message);
            this.feedback = err.message;
          });
      } else this.feedback = "You must enter all fields";
    }
  }
};
</script>

<style>
.login {
  max-width: 500px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
.login .field {
  margin-bottom: 16px;
}
.login p.feedback {
  padding: 4px;
  font-size: 1.1em;
}
</style>