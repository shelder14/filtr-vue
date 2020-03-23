import aliases from '../aliases';

export default function (state, payload) {
  let {
    key,
    value = null,
  } = payload;

  const startOptions = { ...state.options };
  if (aliases[key]) key = aliases[key];
  if (key === 'sort') {
    delete startOptions['order_filter[name]'];
    delete startOptions['order_filter[price]'];
  }
  if (value && startOptions[key]) {
    for (const k in startOptions[key]) {
      const v = startOptions[key][k];
      // значения могут совпадать нестрого, и здесь это нормально
      /* eslint-disable eqeqeq */
      if (v == value) {
        startOptions[key].splice(k, 1);
        break;
      }
    }
    if (!startOptions[key].length) {
      delete startOptions[key];
    }
  } else {
    delete startOptions[key];
  }

  state.options = startOptions;
}
