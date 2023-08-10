const ConfigStore = {
  state: {
    pagesConfig: {
      pages: []
    },
    settings: {}
  },
  getters: {
    getPagesConfig: (state: { pagesConfig: any }) => state.pagesConfig,
    getSettings: (state: { settings: any; }) => state.settings
  },
  mutations: {
    setPagesConfig (state: { pagesConfig: any }, payload: any) {
      state.pagesConfig = payload
    },
    setSettings (state: { settings: any }, payload: any) {
      state.settings = payload
    }
  },
  actions: {},
}

export default ConfigStore
