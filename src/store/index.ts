import { createStore } from 'vuex'
import audioPlayer from './modules/audidPlayer'

const store = createStore({
  modules: {
    audioPlayer
  }
})

export default store
