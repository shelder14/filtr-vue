import aliases from '../aliases';

export default function (state, payload) {
  let {
    key,
    value,
  } = payload;

  const startOptions = { ...state.options };
  if (aliases[key]) key = aliases[key];
  if (value.min && value.max) {
    startOptions[`fields_filter[${key}][0]`] = value.min;
    startOptions[`fields_filter[${key}][1]`] = value.max;
  } else if (key.match(/^fields_filter/)) {
    if (!Array.isArray(startOptions[key]) || !startOptions[key].length) {
      startOptions[key] = [];
    }
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        for (const i in value) {
          const index = startOptions[key].indexOf(value[i]);
          if (index >= 0) {
            startOptions[key].splice(index, 1);
          } else {
            startOptions[key].push(value[i]);
          }
        }
      } else {
        startOptions[key] = { ...startOptions[key], ...value };
      }
    } else {
      startOptions[key].push(value);
    }
  } else {
    if (key === 'sort') {
      delete startOptions['order_filter[name]'];
      delete startOptions['order_filter[price]'];
      key = `order_filter[${value}]`;
      value = 1;
    }
    if (key === 'p') {
      value -= 1;
    }

    startOptions[key] = value;
  }

  state.options = startOptions;
}
