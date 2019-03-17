const baseURL = axios.create({
    baseURL: `http://localhost:3000`
})

const app = new Vue({
    el: '#app',
    data() {
        return {
            iniToken: localStorage.getItem('token'),
            formRegister: true,
            formLogin: true,
            loginGoogle: true,
            allData: false
        }
    },

    methods: {
        home() {
            if (this.iniToken) {
                this.formLogin = false
                this.formRegister = false
                this.allData = true
            }
        },
        hide() {
            this.formLogin = true
            this.formRegister = true
            this.allData = false
        },
        mainlogin(paylod) {
            // console.log(payload);

            this.iniToken = paylod;

            // if (this.iniToken) {
            console.log('adda========');

            this.formLogin = false
            this.formRegister = false
            this.allData = true

            console.log('masok main');
        },
        logout(paylod) {
            this.iniToken = null
            this.hide()
        }
    },
    beforeMount() {
        this.home()
    },
    updated() {
        if (!this.localStorage.token) {
            this.formLogin = true
            this.formRegister = true
            this.allData = false
        } else {
            this.formLogin = false
            this.formRegister = false
            this.allData = true
        }
        // this.onEdit()
    }

})