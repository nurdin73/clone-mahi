import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      BASE_URL:
        process.env.VUE_APP_API_URL ||
        "https://scrapping-mahi.herokuapp.com/api/v1",
    };
  },
  mutations: {},
  actions: {},
  getters: {},
});
export default store;
