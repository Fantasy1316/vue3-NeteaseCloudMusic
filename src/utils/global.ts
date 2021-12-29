import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

/** 路由相关方法 */
export function useRouterMethods() {
  const router = useRouter()
  const route = useRoute()
  type RouterType = 'push' | 'replace'

  // 路由跳转
  const handlePathTo = (path: string, query?: any, type: RouterType = 'push') => {
    router[type]({ path, query })
  }

  return {
    router,
    route,
    handlePathTo
  }
}

/** vuex相关 */
export function useStoreMethods() {
  const store = useStore()

  // 提交数据
  const handleCommitStore = (key: string, data: any) => {
    store.commit(key, data)
  }

  return {
    store,
    handleCommitStore
  }
}
