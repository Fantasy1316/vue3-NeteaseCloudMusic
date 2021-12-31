import { App } from 'vue'
import VConsole from 'vconsole'

const vConosle = new VConsole()

export const vconsolePlugin = {
  install: (app: App) => {
    app.use(vConosle)
  }
}
