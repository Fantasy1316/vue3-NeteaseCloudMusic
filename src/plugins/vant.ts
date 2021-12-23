import { App } from 'vue'
import { ConfigProvider, Button, Tabbar, TabbarItem, Popup, Cell, CellGroup, Switch } from 'vant'

const plugins = [ConfigProvider, Button, Tabbar, TabbarItem, Popup, Cell, CellGroup, Switch]

export const vantPlugins = {
  install: (app: App) => {
    plugins.forEach((item) => {
      app.use(item)
    })
  }
}
