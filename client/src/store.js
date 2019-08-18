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
      projectFilterDescription: '',
    },
    // 代表检索表达式的对象
    taskFilterQueryObject: {},
    projectFilterQueryObject: {},
    // 检索结果
    taskFilterQueryResult: {
      tasksInfoArray: [],
      statusObject4Tasks: {},
    },
    projectFilterQueryResult: {
      projectsInfoArray: [],
      statusObject4Projects: {},
    },
  },
  mutations: {
    // setIndicators: (state, payload) => {
    //   state.indicators.isAdmin = payload.isAdmin;
    // },
    setTaskFilterDescription: (state, payload) => {
      state.messages.taskFilterDescription = payload.taskFilterDescription;
    },
    setProjectFilterDescription: (state, payload) => {
      state.messages.projectFilterDescription = payload.projectFilterDescription;
    },
    setTaskFilterQueryObject: (state, payload) => {
      state.taskFilterQueryObject = payload;
    },
    setProjectFilterQueryObject: (state, payload) => {
      state.projectFilterQueryObject = payload;
    },
    setTaskFilterQueryResult: (state, payload) => {
      state.taskFilterQueryResult = payload;
    },
    setProjectFilterQueryResult: (state, payload) => {
      state.projectFilterQueryResult = payload;
    },
  },
  actions: {
    // setIndicatorsAction: ({ commit }, payload) => {
    //   commit('setIndicators', payload);
    // },
    // 描述字符串
    setTaskFilterDescriptionAction: ({ commit }, payload) => {
      commit('setTaskFilterDescription', payload);
    },
    setProjectFilterDescriptionAction: ({ commit }, payload) => {
      commit('setProjectFilterDescription', payload);
    },
    // 检索表达式的对象
    setTaskFilterQueryObjectAction: ({ commit }, payload) => {
      commit('setTaskFilterQueryObject', payload);
    },
    setProjectFilterQueryObjectAction: ({ commit }, payload) => {
      commit('setProjectFilterQueryObject', payload);
    },
    // 检索结果
    setTaskFilterQueryResultAction: ({ commit }, payload) => {
      commit('setTaskFilterQueryResult', payload);
    },
    setProjectFilterQueryResultAction: ({ commit }, payload) => {
      commit('setProjectFilterQueryResult', payload);
    },
  }
})
