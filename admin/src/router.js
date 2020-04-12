import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from  './views/category/CategoryEdit.vue'
import CategoryList from './views/category/CategoryList.vue'

import ItemEdit from  './views/item/ItemEdit.vue'
import ItemList from './views/item/ItemList.vue'

import HeroEdit from './views/hero/HeroEdit.vue'
import HeroList from './views/hero/HeroList.vue'

import ArticleEdit from './views/article/ArticleEdit.vue'
import ArticleList from './views/article/ArticleList.vue'

import AdEdit from './views/ad/AdEdit.vue'
import AdList from './views/ad/AdList.vue'

import AdminUserEdit from './views/admin_user/AdminUserEdit.vue'
import AdminUserList from './views/admin_user/AdminUserList.vue'

import Login from './views/login/Login.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        // 分类路由
        { path: 'categories/create' , component: CategoryEdit },
        { path: 'categories/list' , component: CategoryList },
        { path: 'categories/edit/:id' , component: CategoryEdit, props: true },

        { path: 'items/create' , component: ItemEdit },
        { path: 'items/list' , component: ItemList },
        { path: 'items/edit/:id' , component: ItemEdit, props: true },

        { path: 'heroes/create' , component: HeroEdit },
        { path: 'heroes/list' , component: HeroList },
        { path: 'heroes/edit/:id' , component: HeroEdit, props: true },

        { path: 'ads/create' , component: AdEdit },
        { path: 'ads/list' , component: AdList },
        { path: 'ads/edit/:id' , component: AdEdit, props: true },

        { path: 'articles/create' , component: ArticleEdit },
        { path: 'articles/list' , component: ArticleList },
        { path: 'articles/edit/:id' , component: ArticleEdit, props: true },

        { path: 'admin_users/create' , component: AdminUserEdit },
        { path: 'admin_users/list' , component: AdminUserList},
        { path: 'admin_users/edit/:id' , component: AdminUserEdit, props: true },
      ]
    }
  
  ]
})
router.beforeEach((to, from, next) => {
  if ( !to.meta.isPublic && !localStorage.token ) {
    return next('/login')
  }
  next()
})
export default router;
