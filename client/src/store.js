import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // indicators: {
    //   isAdmin: true,
    // },
    messages: {
      taskFilterDescription: '',
    },
    taskFilterQueryObject: {},
    taskFilterQueryResult: {
      tasksInfoArray: [],
      statusObject4Tasks: {},
    },
  },
  mutations: {
    // setIndicators: (state, payload) => {
    //   state.indicators.isAdmin = payload.isAdmin;
    // },
    setTaskFilterDescription: (state, payload) => {
      state.messages.taskFilterDescription = payload.taskFilterDescription;
    },
    setTaskFilterQueryObject: (state, payload) => {
      state.taskFilterQueryObject = payload;
    },
    setTaskFilterQueryResult: (state, payload) => {
      state.taskFilterQueryResult = payload;
    },
  },
  actions: {
    // setIndicatorsAction: ({ commit }, payload) => {
    //   commit('setIndicators', payload);
    // },
    setTaskFilterDescriptionAction: ({ commit }, payload) => {
      commit('setTaskFilterDescription', payload);
    },
    setTaskFilterQueryObjectAction: ({ commit }, payload) => {
      commit('setTaskFilterQueryObject', payload);
    },
    setTaskFilterQueryResultAction: ({ commit }, payload) => {
      commit('setTaskFilterQueryResult', payload);
    },
  }
})
