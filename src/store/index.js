import Vue from 'vue';
import Vuex from 'vuex';

import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

import aliases from './aliases';

Vue.use(Vuex);

const initialOptions = {
  [aliases.limit]: 12,
  [aliases.page]: 0,
  filter: 1,
};

export default new Vuex.Store({
  state: {
    filters: {},
    catalog: [],
    total: 0,
    options: { ...initialOptions },
  },

  mutations: {
    setPage(state, newPage) {
      state.options[aliases.page] = newPage - 1;
    },
    setLimit(state, newLimit) {
      state.options[aliases.limit] = newLimit;
    },
    setTotal(state, newTotal) {
      state.total = newTotal;
    },
    setFilters(state, newFilter) {
      state.filters = { ...newFilter };
    },
    setCatalog(state, newCatalog) {
      state.catalog = [...newCatalog];
    },
    ...mutations,
  },

  actions,

  getters: {
    page(state) {
      return state.options[aliases.page] + 1;
    },
    limit(state) {
      return state.options[aliases.limit];
    },
    ...getters,
  },
});
