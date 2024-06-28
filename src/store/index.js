// store/index.js
import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import { login, logout,fetchPlaygrounds,updatePlayground ,register  } from '@/api';

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: true,
    color: "",
    isNavFixed: false,
    isAuthenticated: !!localStorage.getItem('access_token'),
    token: localStorage.getItem('access_token') || '',
    isAbsolute: false,
    showNavs: true,
    showSidenav: false,
    showConfigurator: false,
    showNavbar: false,
    showFooter: false,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,
    playgrounds: [], // Add this line to store playgrounds data
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    cardBackground(state, payload) {
      state.color = payload;
    },
    navbarFixed(state) {
      state.isNavFixed = !state.isNavFixed;
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showConfigurator = !state.showConfigurator;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
    SET_AUTH(state, token) {
      state.isAuthenticated = true;
      state.token = token;
      localStorage.setItem('access_token', token);
      state.showSidenav = true;
      state.showNavbar = true;
      state.showConfigurator = true;
      state.showFooter = false;
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.token = '';
      localStorage.removeItem('access_token');
      state.showSidenav = false;
      state.showConfigurator = false;
      state.showNavbar = false;
      state.showFooter = false;
    },
    SET_PLAYGROUNDS(state, playgrounds) { // Add this mutation
      state.playgrounds = playgrounds;
    },
    UPDATE_PLAYGROUND(state, updatedPlayground) {
      const index = state.playgrounds.findIndex(playground => playground.id === updatedPlayground.id);
      if (index !== -1) {
        state.playgrounds.splice(index, 1, updatedPlayground);
      }
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setCardBackground({ commit }, payload) {
      commit("cardBackground", payload);
    },
    async login({ commit }, credentials) {
      const { access_token } = await login(credentials.phone, credentials.password);
      commit('SET_AUTH', access_token);
    },
    async register({ commit }, credentials) {
      const { access_token } = await register(credentials.phone, credentials.password, credentials.password_confirmation);
      commit('SET_AUTH', access_token);
    },
    async logout({ commit }) {
      await logout();
      commit('LOGOUT');
    },
    initializeAuth({ commit }) {
      const token = localStorage.getItem('access_token');
      if (token) {
        commit('SET_AUTH', token);
      }
    },
    async fetchPlaygrounds({ commit }) { // Add this action
      const playgrounds = await fetchPlaygrounds();
      commit('SET_PLAYGROUNDS', playgrounds);
    },
    async updatePlayground({ commit }, payload) {
      const updatedPlayground = await updatePlayground(payload.id, payload.data);
      commit('UPDATE_PLAYGROUND', updatedPlayground);
    }
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    showSidenav: (state) => state.showSidenav,
    showNavbar: (state) => state.showNavbar,
    showFooter: (state) => state.showFooter,
    showConfigurator: (state) => state.showConfigurator,
    playgrounds: (state) => state.playgrounds, // Add this getter
  },
});
