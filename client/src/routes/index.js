import Posts from '@/components/pages/PostsPage.vue'
import NewPost from '@/components/pages/NewPostPage'
import EditPost from '@/components/pages/EditPostPage'
import InfoBook from '@/components/pages/InfoBook'

const routes = [
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/new',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/posts/:id',
    name: 'EditPost',
    component: EditPost
  },
  {
    path: '/posts/info/:id',
    name: 'InfoBook',
    component: InfoBook
  }
]
export default routes
