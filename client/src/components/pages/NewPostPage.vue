<template>
    <div class="container">
    <div class="row">
        <div class="col-xs-12">
            <h1 class="hh">Добавление новой книги</h1>
            <form>
                <div class="form-group"><input class="form-control" size="70" type="text" name="Name" id="Name" placeholder="Название книги" v-model.trim="post.Name" /></div>
                <div class="form-group"><input class="form-control" size="70" type="text" name="Author" id="Author" placeholder="Автор книги" v-model.trim="post.Author" /></div>
                <div class="form-group"><input class="form-control" size="70" type="text" name="Pages" id="Pages" placeholder="Количество страниц" v-model.trim="post.Pages" /></div>
                <div class="form-group"><textarea class="form-control" type="text" rows="10" name="Spec" id="Spec" placeholder="Напишите описании книги" v-model.trim="post.Spec"></textarea></div>
                <div class="form-group"><input class="form-control" size="70" type="text" name="Image" id="Image" placeholder="URL изображения" v-model.trim="post.Image" /></div>
                <div class="form-group"><button class="btn btn-block btn-primary" type="button" name="addPost" id="addPost" @click="addPost()">Добавить книгу</button></div>
                <section><button class="btn btn-success btn-block" type="button" @click="goBack()">Вернуться к списку</button></section>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import PostsService from '@/services/PostsService'

let myDate = new Date()
let minutes

export default {
  name: 'NewPostPage',
  data () {
    return {
      post: {
        Name: '',
        Author: '',
        Pages: '',
        Spec: '',
        Date_in: '',
        Image: ''
      }
    }
  },
  methods: {
    async addPost () {
      if (this.post.Name !== '' && this.post.Author !== '' && this.post.Pages !== '' && this.post.Spec !== '' && this.post.Image !== '') {
        if (parseInt(myDate.getMinutes()) < 10) {
          minutes = '0' + myDate.getMinutes()
        } else {
          minutes = myDate.getMinutes()
        }
        await PostsService.addNewPost({
          Name: this.post.Name,
          Author: this.post.Author,
          Pages: this.post.Pages,
          Spec: this.post.Spec,
          Date_in: myDate.getDate() + '.' + (parseInt(myDate.getMonth()) + 1).toString() + '.' + myDate.getFullYear() + ' ' + myDate.getHours() + ':' + minutes,
          Image: this.post.Image
        })

        var notification = document.createElement('notification')
        notification.className = 'alert alert-success'
        notification.innerHTML = 'Книга добавлена!'
        document.body.insertBefore(notification, document.body.firstChild)
        setTimeout(function () {
          notification.parentNode.removeChild(notification)
        }, 2000)

        this.$router.push({ name: 'Posts' })
      } else {
        alert('Заполните все информацию!')
      }
    },
    goBack () {
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>

<style>
.hh{
  font-size: 25pt;
}
</style>>
