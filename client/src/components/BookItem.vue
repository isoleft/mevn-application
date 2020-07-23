<template>
    <li>
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img :src="post.Image" width="250" height="200" class="card-img" @click="goBack(post._id)"/>
                </div>
                <div class="col-md-8">
                    <div style="text-align:left;" class="card-body">
                        <h5 class="card-title">{{ post.Name }}</h5>
                        <p class="card-text">Автор:{{ post.Author }}</p>
                        <p class="card-text"> Количество страниц: {{ post.Pages }}</p>
                        <p class="time">{{ post.Date_in }}</p>                      
                        <div class="button-navigation">
                            <router-link type="button" class="btn btn-success" v-bind:to="{ name: 'EditPost', params: { id:post._id } }">Изменить</router-link>
                            <button type="button" class="btn btn-danger" v-on:click="removePost(post._id)">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </li>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'BookItem',
  props: {
    post: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    goBack (value) {
      this.$router.push({name: 'InfoBook', params: { id: value }})
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
        }, 2000)

        this.$router.go(0)
      }
    }
  }
}
</script>

<style scoped>
  .time {
  position: absolute;
  top: 0;
  right: 0;
  padding: 3px 10px 3px 10px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
.button-navigation {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.yes{
    color:green;
}
.no{
    color:red;
}
</style>
