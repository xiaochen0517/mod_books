import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import ConfigStore from './ConfigStore'

export default createStore({
  modules: {
    ConfigStore
  },
  // 在 plugins 中添加 vuex-persistedstate 插件
  plugins: [createPersistedState()],
})
