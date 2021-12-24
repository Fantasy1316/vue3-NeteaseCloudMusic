import { App } from 'vue'
import vueLazy from 'vue3-lazy'
import loading from '../assets/images/vlazy-loading.gif'
import error from '../assets/images/vlazy-error.png'

export const lazyPlugin = {
  install: (app: App) => {
    app.use(vueLazy, {
      loading, // 图片加载时默认图片
      error // 图片加载失败时默认图片
    })
  }
}
