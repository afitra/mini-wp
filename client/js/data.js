 var linkAll = `http://localhost:3000/api/article/all`
 var linkAdd = `http://localhost:3000/api/article/add`
 var link = `http://localhost:3000/api`
 const app = new Vue({
     el: "#app",
     data: {
         access_token: localStorage.getItem('token'),
         page: 'home',
         noId: '',
         search: '',
         name: '',
         created_At: '',
         article: '',
         newTitle: '',
         newCreate: '',
         newArticle: '',
         articles: [],

     },
     created: function () {
         axios.get(`${linkAll}`)
             .then((element) => {
                 console.log(element.data);
                 this.articles = element.data
             })
     },
     methods: {
         addNewArticle() {
             console.log("=======", this.name)
             if (this.name !== '' && this.article !== '' && this.created_At !== '') {

                 var obj = {

                     title: this.name,
                     article: this.article,
                     created_At: this.created_At
                 }
                 this.articles.push(obj)

                 axios.post(`${linkAdd}`, {
                         id: (this.articles.length) + 1,
                         title: this.name,
                         article: this.article,
                         created_At: this.created_At
                     })
                     .then(function (response) {
                         console.log('maokkk');

                         // console.log(response);
                     })
                     .catch(function (error) {
                         console.log(error);
                     });
             } else {
                 alert('input harus di isi')
             }
         },
         editArticle() {
             console.log(this.newArticle)
             console.log(this.newCreate);
             console.log(this.newArticle);

             var obj = {
                 id: this.noId,
                 title: this.newTitle,
                 article: this.newArticle,
                 created_At: this.newCreate
             }
             console.log(obj);

             //  axios.put(`${link}/article/edit/:id`)
             axios({
                     method: 'put',
                     url: `${link}/article/edit/:id`,
                     data: obj

                 })
                 .then(function (response) {
                     console.log('maokkk');

                     // console.log(response);
                 })
                 .catch(function (error) {
                     console.log(error);
                 });

         },
         deleteArticle() {

             axios({
                     method: 'DELETE',
                     url: `${link}/article/delete/${this.noId}`

                 })
                 .then(function (response) {
                     console.log(response)

                     // console.log(response);
                 })
                 .catch(function (error) {
                     console.log(error);
                 });

         }
     },
     computed: {
         filteredList() {
             return this.articles.filter(post => {
                 console.log(this.search);

                 if (post.title == this.search) {
                     return post
                 }
                 // return post.title.toLowerCase().includes(this.search.toLowerCase())
             })
         }
     }



 })