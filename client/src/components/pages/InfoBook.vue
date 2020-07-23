<template>
<div>
  <div class="card mb-3" style="max-width: 900px; margin-left: 10px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img :src="post.Image" width="250" height="400" class="card-img"/>
                </div>
                <div class="col-md-8">
                    <div style="text-align:left;" class="card-body">
                        <h5 class="card-title">{{ post.Name }}</h5>
                        <p class="card-text">Автор:{{ post.Author }}</p>
                        <p class="card-text"> Количество страниц:{{ post.Pages }}</p>
                        <p class="card-text" style="margin-bottom: 3px;"><small class="text-muted">Краткое описание</small></p>
                        <p class="card-text">{{ post.Spec }}</p>
                        <p class="time">{{ post.Date_in }}</p>                       
                        <div class="button-navigation">
                            <button type="button" class="btn btn-secondary" @click="goBack()">«Назад</button>
                            <router-link type="button" class="btn btn-success" v-bind:to="{ name: 'EditPost', params: { id:post._id } }">Изменить</router-link>
                            <button type="button" class="btn btn-danger" v-on:click="removePost(post._id)">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
</div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'InfoBook',
  data () {
    return {
      post: [],   
    }
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({ id: this.$route.params.id })
      this.post = response.data
    },
    async removePost (value) {
      if (confirm('Вы действительно хотите удалить выбранную книгу?')) {
        await PostsService.deletePost(value)

        var notification = document.createElement('notification')
        notification.className = 'alert alert-danger'
        notification.innerHTML = 'Книга удалена!'
        document.body.insertBefore(notification, document.body.firstChild)
        setTimeout(function () {
          notification.parentNode.removeChild(notification)
        }, 3000)

        this.$router.push({ name: 'Posts' })
      }
    },
    goBack () {
      this.$router.push({ name: 'Posts' })
    }
  },
  mounted () {
    this.getPost()
  }
}
</script>

<style scoped>
  .time {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 14px;
}
.button-navigation {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.add {
  position: absolute;
  margin-left: 440px;
  top: 10px;
}
</style>
