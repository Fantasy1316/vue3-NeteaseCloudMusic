import { useRoute, useRouter } from 'vue-router'

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
