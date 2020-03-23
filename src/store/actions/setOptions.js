export default function ({ commit }, newOptions) {
  if (Object.keys(newOptions).indexOf('page') === -1) {
    /* eslint-disable no-param-reassign */
    newOptions.page = 1;
  }

  for (const key in newOptions) {
    let value = newOptions[key];
    if (typeof value === 'string' && value.match(/^delete/)) {
      commit('deleteOption', {
        key,
        value: value.replace(/^delete/, ''),
      });
    } else {
      commit('setOption', {
        key,
        value,
      });
    }
  }
}
