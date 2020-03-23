import aliases from '../aliases';

export default state => (payload) => {
  let key = payload;

  const startOptions = { ...state.options };
  if (aliases[key]) key = aliases[key];
  if (key === 'sort') {
    for (let k in startOptions) {
      if (k.match(/^order_filter/)) {
        return k.replace(/.+\[(.+?)\]/, '$1');
      }
    }
  }
  if (key === 'p') {
    return startOptions[key] + 1;
  }
  return startOptions[key];
};
