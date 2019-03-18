#miniWP


###ROutes


###ROuter for User

|Router                                       |  HTTP        | HEADERS      |BODY                       |description      |
|---------------------------------------------|--------------|--------------|---------------------------|-----------------|
|http://localhost:3000/article/one            |   GET        |    TOKEN     |    none                   |get all Articel  |
|                                             |              |              |                           |                 |
|---------------------------------------------|--------------|--------------|---------------------------|-----------------|
|http://localhost:3000/article/edit/:id       |  PATCH       |   TOKEN      | title ,content,           | edit article    |
|                                             |              |              |featured_image(string all) |                 |
|                                             |              |              |                           |                 |
|---------------------------------------------|--------------|--------------|---------------------------|-----------------|
|http://localhost:3000/article/delete/:id     |    delete    |  TOKEN       |                           |DELETE ARTICLE   |
|                                             |              |              |                           |                 |
|---------------------------------------------|--------------|--------------|---------------------------|-----------------|
|http://localhost:3000/article/uploud         |  PATCH       |   TOKEN      | title ,content,           | edit article    |
|                                             |              |              |(string all)               |                 |
|                                             |              |              | image file                |                 |
|                                             |              |              |                           |                 |
|---------------------------------------------|--------------|--------------|---------------------------|-----------------|
| http://localhost:3000/user/create           |      POST    |              | username, email,password  |  register use   |
|                                             |              |              |       (all string)        |                 |
|                                             |              |              |                           |                 |
|---------------------------------------------|--------------|--------------|---------------------------|-----------------|
| http://localhost:3000/user/login            |    POST      |              | email, password           |   login USER    |
|                                             |              |              |                           |                 |
|---------------------------------------------|--------------|--------------|---------------------------|-----------------|


### Usage
command |
------- |
$ live-server --host=localhost |

<br>
Access the Client via http://localhost:8080/