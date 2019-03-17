Vue.component('login', {
    // props: ['gif'],
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            formLogin: true,
            pesan: '',
            token: '',
            cekFB: ''

        }
    },
    methods: {
        login() {
            var obj = {
                email: this.loginEmail,
                password: this.loginPassword
            }
            // axios.post(`http://localhost:3000/user/login`, obj)
            baseURL({
                    url: `/user/login`,
                    method: 'post',
                    // headers: {
                    //     access_token: localStorage.getItem('token')
                    // },
                    data: obj
                })
                .then((data) => {
                    // console.log(data);

                    localStorage.setItem('token', data.data.token)

                    this.token = data.data.token
                    this.$emit('form-login', this.token)
                    this.pesan = `suksses`
                    // swal(`The returned value is: ${this.pesan}`);


                })
                .catch((err) => {
                    this.pesan = 'gagal'
                    swal(`The returned value is: ${this.pesan}`);
                })
        },
        tampilLogin() {
            // console.log('inin emitnya');
            console.log(this.token);


            this.$emit('form-login', this.token)
        },
        // onSignIn() {
        //     var profile = googleUser.getBasicProfile();
        //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        //     console.log('Name: ' + profile.getName());
        //     console.log('Image URL: ' + profile.getImageUrl());
        //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        //     const id_token = googleUser.getAuthResponse().id_token;
        //     // console.log(id_token);
        //     console.log('masuk goooogle');
        //     // console.log(id_token);
        //     this.cekFB = id_token
        // }

    },
    template: `

    <div>
        

        <form @submit.prevent='login()'  >
            <fieldset>               
                <div class="form-group mx-auto" style="witdh:50%">
                    <label>email</label>
                    <input type="text" v-model="loginEmail" class="form-control" required>
                </div>
                <div class="form-group mx-auto" style="witdh:50%">
                    <label>password</label>
                    <input type="password" v-model="loginPassword" class="form-control" required>
                    <br>
                    <button type="submit" class="btn btn-primary"> login now</button>
                </div>
            </fieldset>
            </form>      
            
           
    </div>

    `
})