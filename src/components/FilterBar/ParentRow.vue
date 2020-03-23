<template>
  <li>
    <span>{{ item['attribute:title'] }}</span>
    <div
      :class="`filter-drop d${fieldName}`"
    >
      <div :id="`${fieldName}-scroll`" class="sroll-item">
        <ul
          v-if="item['attribute:data-type'] === 'relation'"
          :class="`f${fieldName}`"
        >
          <FilterBarRowCheckbox
            v-for="row in item['nodes:item']"
            :key="row['attribute:id']"
            :item="row"
            :passive="row.passive"
            :fieldName="fieldName"
          />
        </ul>

        <FilterBarRowSlider
          v-if="item['attribute:data-type'] === 'int' || item['attribute:data-type'] === 'price'"
          :key="item['attribute:guide-id']"
          :item="item"
          :fieldName="fieldName"
          :minInitValue="parseInt(item.minimum['node:value'], 10)"
          :maxInitValue="parseInt(item.maximum['node:value'], 10)"
        />
      </div>
    </div>
  </li>
</template>

<script>
import FilterBarRowCheckbox from './RowCheckbox.vue';
import FilterBarRowSlider from './RowSlider.vue';

const $ = window.jQuery;

export default {
  name: 'FilterBarParentRow',
  props: {
    item: Object,
  },
  data() {
    return {
      fieldName: this.item['attribute:name'],
    };
  },
  components: {
    FilterBarRowCheckbox,
    FilterBarRowSlider,
  },
  mounted() {
    if (typeof $ !== 'undefined') {
      $(`#${this.fieldName}-scroll`).niceScroll({
        cursorcolor: '#47c8ad',
        cursoropacitymin: 1,
      });
    }
  },
};
</script>
