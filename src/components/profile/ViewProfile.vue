<template>
  <div class="view-profile container">
      <div v-if="profile" class="card">
          <h2 class="deep-purple-text center">{{profile.alias | unslugify}}'s Wall</h2>
          <ul class="comments collection" v-chat-scroll>
              <li class="collection-item" :key="index" v-for="(comment, index) in allComments">
                  <span class="deep-purple-text">{{comment.from | unslugify}}</span>
                  <span class="grey-text text-darken-3">{{comment.content}}</span>
                  <span class="grey-text time">{{comment.time}}</span>
              </li>
          </ul>
          <form @submit.prevent="addComent">
              <div class="field">
                  <label for="comment">Add a comment</label>
                  <input id="commentField"
                    name="comment" 
                    placeholder="Hello, world" 
                    v-model="comment"
                  >
              </div>
          </form>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init.js';
import moment from 'moment';
export default {
    name: 'ViewProfile',
    props: ['id'],
    data() {
        return {
            profile: null,
            comment: null,
            allComments: new Array()
        }
    },
    methods: {
        addComent() {
            if(this.comment) {
                document.getElementById('commentField').disabled = true;
                const user = firebase.auth().currentUser;
                db.collection('users').where('id', '==', user.uid).get().then(res=>{
                    db.collection('comments').add({
                        content: this.comment,
                        from: res.docs[0].data().alias,
                        time: Date.now(),
                        to: this.profile.alias
                    }).then(()=>{
                        this.comment = null;
                        document.getElementById('commentField').disabled = false;
                    });
                });
            }
        }
    },
    created() {
        db.collection('users').doc(this.$route.params.id).get()
            .then(user => {
                this.profile = user.data();
                if(!this.profile) this.$router.push({name: 'NotFound'});
                db.collection('comments').orderBy('time').onSnapshot(snapshot=>{
                    snapshot.docChanges().forEach(change=>{
                        if(change.type === 'added') {
                            const doc = change.doc.data();
                                if(doc.to === this.profile.alias) {
                                    this.allComments.push({
                                    content: doc.content,
                                    from: doc.from,
                                    time: moment(doc.time).format('lll'),
                                });
                            }
                        }
                    })
                })
            });
    }
}
</script>

<style>
    .view-profile .comments {
        max-height: 300px;
        overflow: auto;
    }
    .view-profile .comments li {
        padding: 10px;
    }
    .view-profile .comments .time {
        display: block;
        font-size: .75em;
    }
    .view-profile .comments::-webkit-scrollbar {
        width: 3px;
    }
    .view-profile .comments::-webkit-scrollbar-track {
        background: #ddd;
    }
    .view-profile .comments::-webkit-scrollbar-thumb {
        background: #aaa;
    }
    .view-profile form {
        padding: 10px;
    }
</style>