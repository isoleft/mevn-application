<template>
  <div class="container">
    <div class="row">
        <div class="col-xs-12">
            <h1 class="hh">Редактирование книги</h1>
            <form @submit.prevent="editPost()">
                <div class="form-group"><input class="form-control" size="70" type="text" name="Name" id="Name" placeholder="Название книги" v-model.trim="post.Name" /></div>
                <div class="form-group"><input class="form-control" size="70" type="text" name="Author" id="Author" placeholder="Автор книги" v-model.trim="post.Author" /></div>
                <div class="form-group"><input class="form-control" size="70" type="text" name="Pages" id="Pages" placeholder="Количество страниц" v-model.trim="post.Pages" /></div>
                <div class="form-group"><textarea class="form-control" type="text" rows="10" name="Spec" id="Spec" placeholder="Напишите описании книги" v-model.trim="post.Spec"></textarea></div>
                <div class="form-group"><input class="form-control" size="70" type="text" name="Image" id="Image" placeholder="URL изображения" v-model.trim="post.Image" /></div>
                <div class="form-group"><button class="btn btn-block btn-primary" type="submit" name="editPost">Редактировать</button></div>
                <section><button class="btn btn-success btn-block" type="button" @click="goBack()">Вернуться назад</button></section>
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
  name: 'EditPostPage',
  data () {
    return {
      post: {
        Name: '',
        Author: '',
        Pages: '',
        Spec: '',
        Date_in: '',
        Image: '',
        prevRoute: null
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({ id: this.$route.params.id })
      this.post = response.data
    },
    async editPost () {
      if (this.post.Name !== '' && this.post.Author !== '' && this.post.Pages !== '' && this.post.Spec !== '' && this.post.Image !== '') {
        if (parseInt(myDate.getMinutes()) < 10) {
          minutes = '0' + myDate.getMinutes()
        } else {
          minutes = myDate.getMinutes()
        }
        await PostsService.updatePost({
          id: this.$route.params.id,
          Name: this.post.Name,
          Author: this.post.Author,
          Pages: this.post.Pages,
          Spec: this.post.Spec,
          Date_in: myDate.getDate() + '.' + (parseInt(myDate.getMonth()) + 1).toString() + '.' + myDate.getFullYear() + ' ' + myDate.getHours() + ':' + minutes,
          Image: this.post.Image
        })

        var notification = document.createElement('notification')
        notification.className = 'alert alert-success'
        notification.innerHTML = 'Информация отредактирована!'
        document.body.insertBefore(notification, document.body.firstChild)
        setTimeout(function () {
          notification.parentNode.removeChild(notification)
        }, 2000)
        this.$router.push({ path: this.prevRoute.path })
      }
    },
    goBack () {
      this.$router.push({ path: this.prevRoute.path })
    }
  },
  mounted () {
    this.getPost()
  }
}
</script>

<style>
.hh{
  font-size: 25pt;
}
.body
{
  text-align:center;
}
</style>
