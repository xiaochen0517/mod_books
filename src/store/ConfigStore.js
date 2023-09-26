const ConfigStore = {
  state: {
    pagesConfig: {
      pages: [],
      main_path: "",
    },
    settings: {
      theme: "light",
    }
  },
  getters: {
    getPagesConfig: (state) => state.pagesConfig,
    getSettings: (state) => state.settings
  },
  mutations: {
    setPagesConfig (state, payload) {
      state.pagesConfig = payload;
    },
    setSettings (state, payload) {
      state.settings = payload;
    },
    setTheme (state, payload) {
      state.settings.theme = payload;
    }
  },
  actions: {},
};

export default ConfigStore;
