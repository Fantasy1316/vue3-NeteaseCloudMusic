import { App } from 'vue'
import { vantPlugins } from './vant'
import { lazyPlugin } from './vlazy'
import { vconsolePlugin } from './vconosle'

export const setupPlugins = (app: App) => {
  app.use(vantPlugins)
  app.use(lazyPlugin)
  app.use(vconsolePlugin)
}
