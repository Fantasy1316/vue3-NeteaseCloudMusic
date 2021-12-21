import { App } from 'vue'
import { Button } from 'vant'

const plugins = [Button]

export const vantPlugins = {
  install: (app: App) => {
    plugins.forEach((item) => {
      app.use(item)
    })
  }
}
