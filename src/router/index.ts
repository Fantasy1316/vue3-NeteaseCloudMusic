import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeLayout from '../layout/HomeLayout/index.vue'
import DefaultLayout from '../layout/DefaultLayout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    redirect: '/home/findings',
    component: HomeLayout,
    children: [
      {
        path: 'findings',
        meta: { title: '发现', authorize: false },
        component: () => import(/* webpackChunkname: home */ '../views/Home/Findings/index.vue')
      }
    ]
  },
  {
    path: '/player',
    redirect: '/player/audio',
    component: DefaultLayout,
    children: [
      {
        path: 'audio/:id',
        meta: { title: '发现', authorize: false },
        component: () => import(/* webpackChunkname: player */ '../views/Player/Audio/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
