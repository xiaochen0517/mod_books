import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";

import ConfigStore from "./ConfigStore";

export default createStore({
  modules: {
    ConfigStore
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
    paths: ["ConfigStore.settings"],
  })],
});
