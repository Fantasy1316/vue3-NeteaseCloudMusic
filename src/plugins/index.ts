import { App } from 'vue'
import { vantPlugins } from './vant'
import { lazyPlugin } from './vlazy'

export const setupPlugins = (app: App) => {
  app.use(vantPlugins)
  app.use(lazyPlugin)
}
