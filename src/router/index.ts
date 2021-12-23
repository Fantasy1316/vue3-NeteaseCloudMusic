import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeLayout from '../layout/HomeLayout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    redirect: '/home/index',
    component: HomeLayout,
    children: [
      {
        path: 'index',
        meta: { title: '发现', authorize: false },
        component: () => import(/* webpackChunkname: index */ '../views/Home/Findings/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
