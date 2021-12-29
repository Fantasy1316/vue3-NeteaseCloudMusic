import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    redirect: '/home/findings',
    component: DefaultLayout,
    children: [
      {
        path: 'findings',
        meta: { title: '发现', authorize: false },
        component: () => import(/* webpackChunkname: home */ '../views/Home/Findings/findings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
