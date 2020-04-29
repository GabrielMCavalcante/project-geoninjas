<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="youremail@example.com" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="a1bc23de45" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias</label>
        <input @keyup="toggleFeedback" name="alias" placeholder="Ex.: John Macel" v-model="alias" />
      </div>
      <p v-if="feedback" class="center deep-purple darken-2 white-text feedback">{{feedback}}</p>
      <div v-if="signingUp" class="field center">
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
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init.js";
import firebase from "firebase";
import 'firebase/functions';
import slugify from "slugify";
import {mapActions} from 'vuex';
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      signingUp: false
    };
  },
  methods: {
    toggleFeedback(e) {
      this.feedback = e.key !== "Enter" ? null : this.feedback;
    },
    ...mapActions(['updateUser']),
    signup() {
      if (this.alias && this.email && this.password) {
        this.signingUp = true;

        const slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$@*_+~.()'"!\-:@]/g,
          lower: true
        });

        const checkAlias = firebase.functions().httpsCallable('checkAlias');
        checkAlias({slug}).then(result=>{
          if (result.data.unique) {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                this.signingUp = false;
                db.collection('users').doc(slug).set({
                    alias: slug,
                    geolocation: null,
                    id: cred.user.uid
                  }).then(() => {
                    this.updateUser();
                    this.$router.push({ name: "GMap" });
                  });
              }).catch(err => {
                this.signingUp = false;
                console.error("There has been an error: ", err);
                this.feedback = err.message;
              });
          } else {
            this.signingUp = false; 
            this.feedback = "This alias is already in use!";
          }
        })
      } else this.feedback = "You must enter a value to all fields";
    }
  }
};
</script>

<style>
.signup {
  max-width: 500px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
.signup p.feedback {
  padding: 4px;
  font-size: 1.1em;
}
</style>