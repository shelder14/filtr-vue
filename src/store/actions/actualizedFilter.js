export default function ({ state, commit }, actualFilter) {
  let prevFilter = { ...state.filters };
  let selectedFields = actualFilter['nodes:current_filter'];

  if (!prevFilter['nodes:field'] || !prevFilter['nodes:field'].length) {
    prevFilter = { ...actualFilter };
    commit('setFilters', prevFilter);
    return;
  }

  for (let i1 in prevFilter['nodes:field']) {
    let prevField = prevFilter['nodes:field'][i1];
    if (
      selectedFields && selectedFields.length
      && selectedFields.indexOf(prevField['attribute:name']) === -1
    ) {
      let isHere = false;

      for (let i2 in actualFilter['nodes:field']) {
        let actualField = actualFilter['nodes:field'][i2];

        if (prevField['attribute:name'] === actualField['attribute:name']) {
          isHere = true;
          break;
        }
      }

      if (!isHere) {
        for (let j1 in prevField['nodes:item']) {
          let prevItem = prevField['nodes:item'][j1];

          prevItem.passive = true;
        }
      }
    }

    for (let i2 in actualFilter['nodes:field']) {
      let actualField = actualFilter['nodes:field'][i2];

      if (prevField['attribute:name'] === actualField['attribute:name']) {
        if (actualField.minimum && actualField.maximum) {
          prevField.minimum = actualField.minimum;
          prevField.maximum = actualField.maximum;
        } else {
          for (let j1 in prevField['nodes:item']) {
            let prevItem = prevField['nodes:item'][j1];

            prevItem.passive = true;

            for (let j2 in actualField['nodes:item']) {
              let actualItem = actualField['nodes:item'][j2];

              if (prevItem['attribute:id'] === actualItem['attribute:id']) {
                prevItem.passive = false;
              }
            }
          }
        }
      }
    }
  }

  commit('setFilters', prevFilter);
}
