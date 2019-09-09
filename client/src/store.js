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
      userFilterDescription: '',
      fileFilterDescription: '',
    },
    // 代表检索表达式的对象
    taskFilterQueryObject: {},
    projectFilterQueryObject: {},
    userFilterQueryObject: {},
    fileFilterQueryObject: {},
    // 检索结果
    taskFilterQueryResult: {
      tasksInfoArray: [],
      statusObject4Tasks: {},
    },
    projectFilterQueryResult: {
      projectsInfoArray: [],
      statusObject4Projects: {},
    },
    userFilterQueryResult: {
      usersInfoArray: [],
      statusObject4Users: {},
    },
    fileFilterQueryResult: {
      filesInfoArray: [],
      statusObject4Files: {},
    },
  },
  mutations: {
    // setIndicators: (state, payload) => {
    //   state.indicators.isAdmin = payload.isAdmin;
    // },
    // 描述字符串
    setTaskFilterDescription: (state, payload) => {
      state.messages.taskFilterDescription = payload.taskFilterDescription;
    },
    setProjectFilterDescription: (state, payload) => {
      state.messages.projectFilterDescription = payload.projectFilterDescription;
    },
    setUserFilterDescription: (state, payload) => {
      state.messages.userFilterDescription = payload.userFilterDescription;
    },
    setFileFilterDescription: (state, payload) => {
      state.messages.fileFilterDescription = payload.fileFilterDescription;
    },
    // 检索表达式的对象
    setTaskFilterQueryObject: (state, payload) => {
      state.taskFilterQueryObject = payload;
    },
    setProjectFilterQueryObject: (state, payload) => {
      state.projectFilterQueryObject = payload;
    },
    setUserFilterQueryObject: (state, payload) => {
      state.userFilterQueryObject = payload;
    },
    setFileFilterQueryObject: (state, payload) => {
      state.fileFilterQueryObject = payload;
    },
    // 检索结果
    setTaskFilterQueryResult: (state, payload) => {
      state.taskFilterQueryResult = payload;
    },
    setProjectFilterQueryResult: (state, payload) => {
      state.projectFilterQueryResult = payload;
    },
    setUserFilterQueryResult: (state, payload) => {
      state.userFilterQueryResult = payload;
    },
    setFileFilterQueryResult: (state, payload) => {
      state.fileFilterQueryResult = payload;
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
    setUserFilterDescriptionAction: ({ commit }, payload) => {
      commit('setUserFilterDescription', payload);
    },
    setFileFilterDescriptionAction: ({ commit }, payload) => {
      commit('setFileFilterDescription', payload);
    },
    // 检索表达式的对象
    setTaskFilterQueryObjectAction: ({ commit }, payload) => {
      commit('setTaskFilterQueryObject', payload);
    },
    setProjectFilterQueryObjectAction: ({ commit }, payload) => {
      commit('setProjectFilterQueryObject', payload);
    },
    setUserFilterQueryObjectAction: ({ commit }, payload) => {
      commit('setUserFilterQueryObject', payload);
    },
    setFileFilterQueryObjectAction: ({ commit }, payload) => {
      commit('setFileFilterQueryObject', payload);
    },
    // 检索结果
    setTaskFilterQueryResultAction: ({ commit }, payload) => {
      commit('setTaskFilterQueryResult', payload);
    },
    setProjectFilterQueryResultAction: ({ commit }, payload) => {
      commit('setProjectFilterQueryResult', payload);
    },
    setUserFilterQueryResultAction: ({ commit }, payload) => {
      commit('setUserFilterQueryResult', payload);
    },
    setFileFilterQueryResultAction: ({ commit }, payload) => {
      commit('setFileFilterQueryResult', payload);
    },
  }
})
