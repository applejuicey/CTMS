import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    indicators: {
      isAdmin: false,
    },
    messages: {
      taskFilterDescription: '',
    },
    // userInfo: {},
  },
  mutations: {
    setIndicators: (state, payload) => {
      state.indicators.isAdmin = payload.isAdmin;
    },
    setTaskFilterDescription: (state, payload) => {
      state.messages.taskFilterDescription = payload.taskFilterDescription;
    },
    // getUserInfo: (state) => {
    //  state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // },
  },
  actions: {
    // getUserInfo: ({commit}) => {
    //   commit('getUserInfo');
    // },
    setIndicatorsAction: ({ commit }, payload) => {
      commit('setIndicators', payload);
    },
    setTaskFilterDescriptionAction: ({ commit }, payload) => {
      commit('setTaskFilterDescription', payload);
    },
  }
})
