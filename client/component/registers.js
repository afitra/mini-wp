Vue.component('register', {
    data() {
        return {
            registerUsername: '',
            registerEmail: '',
            registerPassword: '',
            formRegister: true,
            pesan: '',
        }
    },
    methods: {
        createUser() {
            var obj = {
                username: this.registerUsername,
                email: this.registerEmail,
                password: this.registerPassword
            }
            // axios.post(`http://localhost:3000/user/create`, obj)
            baseURL({
                    url: `/user/create`,
                    method: 'post',
                    // headers: {
                    //     access_token: localStorage.getItem('token')
                    // },
                    data: obj
                })
                .then((data) => {
                    console.log(data.data);

                    this.pesan = `suksses`
                    swal(`register is: ${this.pesan} silahkan login `);
                    this.registerEmail = ''
                    this.registerUsername = ''
                    this.registerPassword = ''
                })
                .catch((err) => {
                    this.pesan = 'gagal'
                    swal(`register is: ${this.pesan}  username/email salah`);
                })
        }
    },
    template: `
    <div>            
        <form v-on:submit.prevent='createUser' v-if="formRegister">
            <fieldset>
                <div class="form-group mx-auto" style="witdh:50%">
                    <label>username</label>
                    <input type="text" v-model="registerUsername" class="form-control" required>
                </div>
                <div class="form-group mx-auto" style="witdh:50%">
                    <label>email</label>
                    <input type="text" v-model="registerEmail" class="form-control" required>
                </div>
                <div class="form-group mx-auto" style="witdh:50%">
                    <label>password</label>
                    <input type="password" v-model="registerPassword" class="form-control" required>
                    <br>
                    <button type="submit" class="btn btn-primary"> register now</button>
                </div>
            </fieldset>
        </form>

    </div>

    `
})