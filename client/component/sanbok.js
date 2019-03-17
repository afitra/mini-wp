Vue.component('articlelist', {
    data() {
        return {
            title: '',
            content: '',
            status: '',
            created_at: new Date(),
            imageUrl: '',
            author: '',
            articles: []
        }
    },
    mounted() {
        axios
            .get(`${url}/mini-wp/article`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(data => {
                console.log(data.data)
                this.articles = data.data
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        update(id) {
            console.log(id)
            let obj = {
                title: this.title,
                content: this.content,
                status: this.status,
                created_at: this.created_at,
                imageUrl: this.imageUrl,
                author: this.author
            }
            axios
                .put(`${url}/mini-wp/article/edit/${id}`, obj)
                .then(article => {
                    console.log(article)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deletearticle(id) {
            console.log(id)

            axios
                .delete(`${url}/mini-wp/article/delete/${id}`)
                .then(article => {
                    console.log(article)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // v-on:click="update(article._id)"
    },
    template: `
    <div class="container">
        <div class="row">
            <div class="col-lg-4" v-for="article in articles">
                <div class="card" style="min-width: 20rem; max-width: 25rem;">
                    <img class="card-img-top" :src="article.imageUrl" alt="Card image cap">
                    <div class="card-body">
                        <h3>{{article.title}}</h3>
                        <p class="card-text">{{article.content}}</p>
                        <p class="card-text">author by {{article.author.username}} </p>
                    </div>
                    <div>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Update</button>
                    </div>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <form v-on:submit.prevent="update(article._id)">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Article</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <input type="text" class="form-control" v-model="title" value="article.title">
                        <textarea name="content" id="content" cols="30" rows="10" placeholder="content" class="form-control" v-model="content" value="article.content"></textarea>
                        
                        <p class="card-text">author by {{article.author.username}} </p>
                        
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                        </form>
                    </div>
                    </div>
                    <div>
                    <button type="submit" class="btn btn-danger" v-on:click.prevent="deletearticle(article._id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})