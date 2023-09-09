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
        getPagesConfig: (state: { pagesConfig: any }) => state.pagesConfig,
        getSettings: (state: { settings: any; }) => state.settings
    },
    mutations: {
        setPagesConfig (state: { pagesConfig: any }, payload: any) {
            state.pagesConfig = payload;
        },
        setSettings (state: { settings: any }, payload: any) {
            state.settings = payload;
        },
        setTheme (state: { settings: any }, payload: string) {
            state.settings.theme = payload;
        }
    },
    actions: {},
};

export default ConfigStore;
