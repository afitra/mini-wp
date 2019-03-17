Vue.component('alldata', {
    data() {
        return {
            idUser: '',
            data: [],
            pesan: '',
            title: '',
            content: '',
            image: '',
            newTitle: '',
            newContent: '',
            newImage: '',
            formEdit: false,
            formList: true,
            formCreate: false,
            formData: ''


        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component
    },
    methods: {
        //sudah midlewere
        findAll() {
            // axios.post(`http://localhost:3000/user/create`, obj)
            baseURL({
                    url: `/article/one`,
                    method: 'get',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((data) => {
                    this.data = data.data
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        edit() {
            //sudah midlewere
            var dataToken = localStorage.getItem('token')
            if (dataToken) {
                baseURL({
                        url: `/article/edit/${this.idUser}`,
                        method: 'patch',
                        headers: {
                            token: localStorage.getItem('token')
                        },
                        data: {
                            title: this.newTitle,
                            content: this.newContent,
                            featured_image: this.newImage
                        }
                    })
                    .then((data) => {
                        console.log(data.data);
                        this.pesan = 'edit sukses '
                        swal(`selamat title ${this.newTitle}  ${this.pesan}`);
                        this.noEdit()
                    })
                    .catch((err) => {
                        console.log(err);
                        this.pesan = 'delete gagal '
                        swal(`selamat title ${newTitle} ${this.pesan}`);
                    })
            } else {
                this.pesan = 'no akses'
                swal(`sorry ${this.pesan}`);
            }

        },
        remove(ID, dataTitle) {
            // console.log(localStorage.getItem('token'));


            //sudah midlewere
            var dataToken = localStorage.getItem('token')
            if (dataToken) {
                baseURL({
                        url: `/article/delete/${ID}`,
                        method: 'delete',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .then((data) => {
                        // this.data = data.data
                        // console.log(data.data);
                        this.pesan = 'delete sukses '
                        swal(`selamat title ${dataTitle} ${this.pesan}`);
                    })
                    .catch((err) => {
                        // this.pesan = 'gagal'
                        // console.log(err);
                        this.pesan = err
                        swal(`selamat  title ${dataTitle} gagal ${this.pesan}`);
                    })
            } else {
                this.pesan = 'no aksses'
                swal(`sorry ${this.pesan}`);
                // @click="edit(item._id,item.title)"
            }

        },
        noEdit() {

            this.formList = true
            this.formEdit = false
        },
        onEdit(ID, dataTitle, dataContent, dataImage) {
            this.idUser = ID
            console.log(ID);
            console.log(dataTitle);
            console.log(dataContent);
            console.log(dataImage);

            this.formList = false
            this.formEdit = true

            this.title = dataTitle
            this.content = dataContent
            this.image = dataImage
            // this.proses(ID)

        },
        proses() {
            this.newTitle = this.title
            this.newContent = this.content
            this.newImage = this.image
            // console.log(ID);
            this.edit()

        },
        add() {
            this.formEdit = false
            this.formList = false
            this.formCreate = true

            let formData = new FormData()
            formData.append('title', this.newTitle)
            formData.append('content', this.newContent)
            formData.append('featured_image', this.newImage)
            this.formData = formData
            // console.log(formData);

            // baseURL({
            //         url: `/article/uploud`,
            //         method: 'post',
            //         data: formData,
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //             token: localStorage.getItem('token')
            //         }
            //     })
            axios.post(`http://localhost:3000/article/uploud`, this.formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: localStorage.getItem('token')
                    }
                })
                .then((data) => {
                    // this.data = data.data
                    // console.log(data.data);
                    this.pesan = 'create sukses '
                    swal(`selamat title   ${this.pesan}`);
                })
                .catch((err) => {
                    // this.pesan = 'gagal'
                    // console.log(err);
                    this.pesan = err
                    // swal(`selamat  title   gagal ${this.pesan}`);
                })


        },
        showAll() {
            this.formList = true
        },
        handleFileUpload(event) {
            console.log("masuk file upload", this.$refs.newImage)
            this.newImage = this.$refs.newImage.files[0]
            console.log(this.newImage)

        },
        logout() {
            localStorage.removeItem('token');
            this.$emit('alldata', this.token)
            this.pesan = 'sukses'
            swal(`logout ${this.pesan}`);
        },
        getlink(value) {
            return 'https://www.facebook.com/sharer/sharer.php?u=' + value + '&amp;src=sdkpreparse%2F&amp;src=sdkpreparse'
        },
        getWhatsApp(dataTitle, dataContent, dataImage) {
            return `https://api.whatsapp.com/send?phone=&text=%20%0D%0A${dataTitle}%0D%0A${dataContent}%0D%0A${dataImage}`
        }
    },
    mounted() {
        this.findAll()
    },
    updated() {
        this.findAll()
        // this.onEdit()
    },
    template: `
   <div>       
   <button type="submit" class="btn btn-primary" @click="add"> create new post</button>
   <button type="submit" class="btn btn-primary" @click="showAll"> show all post</button>
   <button type="submit" class="btn btn-primary" @click="logout"> logout now</button><br><br>


   <!--  ini form create post -->
   
    
   <div class="container" v-if="formCreate">
   <div class="row">
       <div class="col-sm-12">
           <form v-on:submit.prevent="add">                            
               <fieldset>
                   <input type="text" name="newTitle" id="title" v-model="newTitle" placeholder="title" class="form-control">
                   <wysiwyg v-model="newContent" />
                    
                   <div class="form-group mx-auto" style="width: 50%">
                   <label for="exampleInputFile">Upload Your Video Here</label>
                   <input type="file" id="file" class="inputFile" ref="newImage" v-on:change="handleFileUpload" required/>
                   </div>
                   <button type="submit" class="btn btn-primary">Post Article</button>
               </fieldset>
           </form>
       </div>
   </div>
</div>


   <!--  ini form edit -->


   <form v-if="formEdit">
   <fieldset>
       <div class="form-group mx-auto" style="witdh:50%">
           <label>title</label>
           <input type="text" v-model="title" class="form-control" required>
       </div>
       <div class="form-group mx-auto" style="witdh:50%">
           <label>content</label>
           <wysiwyg v-model="content" />
            
       </div>
       <div class="form-group mx-auto" style="witdh:50%">
           <label>image url</label>
           <input type="text" v-model="image" class="form-control" required>
           <br>
           <button type="submit" class="btn btn-primary" @click.prevent="proses()"> edit now</button>
           <button type="submit" class="btn btn-primary"  @click="noEdit()"> cancel </button>

       </div> 
   </fieldset>
</form>

<!--  ini list all article  -->
        <div class="container" v-if="formList">
            <div class="row">                         
                <div class="col-sm-4" v-for="(item,index) in data">
                    <div class="card" style="width: 19rem;">
                        <img class="card-img-top" :src="item.featured_image"
                            alt="Card image cap">
                        <div class="card-body">
                            <h2>{{item.title}}</h2>
                            <p class="card-text">{{item.content}}</p>
                        </div>
                        <div>
                        <button type="submit" class="btn btn-success"
                         @click="onEdit(item._id,item.title,item.content,item.featured_image)" > update now</button>   
                         
                        </div>
                        
                        <div>
                        <button type="submit" class="btn btn-secondary" @click="remove(item._id,item.title)" > delete now</button>     
                        </div>
                        
                        <div class="fb-share-button" :data-href="item.featured_image" data-layout="button" data-size="large">
                        <button class="btn btn-primary" :data-href="item.featured_image">
                        <a target="_blank" :href="getlink(item.featured_image)" class="fb-xfbml-parse-ignore"><i class="fab fa-facebook-square"></i>&nbspShare facebook</a>
                        
                        </button>

                         <button>
                        <a target="_blank" :href="getWhatsApp(item.title,item.content,item.featured_image)"  >SHARE
                        WA</a> </button>
                        
                    </div>



                    </div>
                </div>
            </div>
        </div>
    </div>

    `
})