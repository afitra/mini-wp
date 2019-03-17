 Vue.component('google', {

     data() {
         return {
             cekgoogle: ''
         }
     },
     component: {
         //  google: google.user.default
     },
     mounted() {
         //  gapi.signin2.render('google', {
         //      onsuccess: this.onSignIn
         //  })
     },
     methods: {
         onSignIn(user) {
             const profile = user.getBasicProfile()
             console.log(profile)
         }
     }
     //  ,
     //  created: {
     //      onSignIn() {
     //          console.log('masuk goooogle');
     //          var profile = googleUser.getBasicProfile();
     //          console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
     //          console.log('Name: ' + profile.getName());
     //          console.log('Image URL: ' + profile.getImageUrl());
     //          console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
     //          const id_token = googleUser.getAuthResponse().id_token;
     //          // console.log(id_token);
     //          // console.log(id_token);
     //          this.cekgoogle = id_token
     //      }
     ,
     template: `
 <div>
<div class = "g-signin2" @click="onSignIn" id = "google_signin" > </div>         
 </div>
 
    

    `
 })