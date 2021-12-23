import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { setupPlugins } from './plugins/index'
import './assets/styles/index.less'

const app = createApp(App)

app.use(router)
app.use(store)
setupPlugins(app)

app.mount('#app')
