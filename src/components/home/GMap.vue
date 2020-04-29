<template>
  <div class="map">
      <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import firebase from 'firebase';
import db from '@/firebase/init.js';
export default {
    name: 'GMap',
    data() {
        return {
            lat: 53,
            lng: -2
        }
    },
    methods: {
        ...mapActions(['updateUser']),
        renderMap() {
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng},
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            });

            db.collection('users').get().then(users=>{
                users.docs.forEach(doc=>{
                    const data = doc.data();
                    if(data.geolocation) {
                        const marker = new google.maps.Marker({
                            position: {
                                lat: data.geolocation.lat,
                                lng: data.geolocation.lng
                            }, map
                        });
                        marker.addListener('click', ()=>{
                            this.$router.push({name: 'ViewProfile', params: {id: doc.id}});
                        })
                    }
                })
            });
        }
    },
    mounted() {
        const user = firebase.auth().currentUser;

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos=>{
                this.lat = pos.coords.latitude;
                this.lng = pos.coords.longitude;
                db.collection('users').where('id', '==', user.uid).get()
                    .then(snapshot=>{
                        db.collection('users').doc(snapshot.docs[0].id).update({
                            geolocation: { lat: this.lat, lng: this.lng }
                        })
                    }).then(()=>this.renderMap());
            }, err => {
                console.log('Cannot get current location: ', err);
                this.renderMap();
            }, { maximumAge: 60000, timeout: 3000 });
        } else this.renderMap();
        
        this.updateUser();
    }
}
</script>

<style>
    .google-map {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>