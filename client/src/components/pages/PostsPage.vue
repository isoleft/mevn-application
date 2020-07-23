<template>
<div>
  <div>
  <select style="position: absolute; top: 20px; left: 100px;" v-model="selectedSort">
    <option disabled value="">Выберите фильтр</option>
    <option class="dropdown-item" :selected="sort.Name == selectedSort.Name" v-for="sort in sortTypes" :key="sort.Name" v-bind:value="sort">{{sort.Name}}</option>
  </select>
  </div>
  <div class="add">
      <router-link class="btn btn-success" v-bind:to="{ name: 'NewPost' }">Добавить книгу</router-link>
    </div>
    <div class="list">
      <ul>
        <book-item
          v-for="post in posts"
          v-bind:post="post"
          v-bind:key="post.Name"
        ></book-item>
      </ul>
    </div>
</div>
</template>

<script>
import PostsService from '@/services/PostsService'
import BookItem from '@/components/BookItem'

const DEFAULT_SORT = 'Last'

export default {
  name: 'PostsPage',
  components: { BookItem },
  data () {
    return {
      posts: [],
      selectedSort: '',
      sortTypes: {
        Last: {
          sortBy: 'Date_in',
          sortOrder: -1,
          Name: 'По дате добавления(сначала новые)'
        },
        Old: {
          sortBy: 'Date_in',
          sortOrder: 1,
          Name: 'По дате добавления(сначала старые)'
        },
        CountPagesMany: {
          sortBy: 'Pages',
          sortOrder: -1,
          Name: 'По количеству страниц(много)'
        },
        CountPahesLittle: {
          sortBy: 'Pages',
          sortOrder: 1,
          Name: 'По количеству страниц(мало)'
        },
        Abc: {
          sortBy: 'Name',
          sortOrder: 1,
          Name: 'По алфавиту'
        },
        Cba: {
          sortBy: 'Name',
          sortOrder: -1,
          Name: 'Против алфавиту'
        }
      }
    }
  },
  methods: {
    async getPosts (sort) {
      const response = await PostsService.fetchPosts(sort.sortBy, sort.sortOrder)
      this.posts = response.data.posts
    }
  },
  mounted () {
    this.selectedSort = this.sortTypes[DEFAULT_SORT]
    this.getPosts(this.selectedSort)
  },
  watch: {
    selectedSort (value) {
      this.getPosts(value)
    }
  }
}
</script>

<style scoped>
.add {
  position: absolute;
  margin-left: 440px;
  top: 10px;
}
</style>
