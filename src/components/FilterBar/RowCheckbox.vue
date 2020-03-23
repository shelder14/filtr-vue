<template>
  <li
    :class="`${checked ? ' active' : ''} ${passive ? ' passive' : ''}`"
    v-if="isShow()"
  >
    <label
      :for="`option_filter_${item['attribute:id']}`"
      :title="`Найдено ${item['attribute:cnt']} шт.`"
    >
      <input type="checkbox"
        :id="`option_filter_${item['attribute:id']}`"
        :name="nameKey + '[]'"
        :value="item['attribute:id']"
        :checked="checked"
        :disabled="passive"
        v-on:change="toggleChecked($event)"
      >
      <div
        :class="`checkboxArea ${checked ? ' checkboxAreaChecked' : ''}`"
      ></div>
      {{ item['node:value'] }}
    </label>
  </li>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'FilterBarRowCheckbox',
  data() {
    const nameKey = `fields_filter[${this.fieldName}]`;
    return {
      nameKey,
    };
  },
  computed: {
    checked() {
      const values = this.getOption(this.nameKey);
      let checked = false;
      if (Array.isArray(values)) {
        for (const i in values) {
          if (parseInt(values[i], 10) === parseInt(this.item['attribute:id'], 10)) {
            checked = true;
            break;
          }
        }
      }
      return checked;
    },
  },
  props: {
    item: Object,
    passive: Boolean,
    actualItem: Object,
    fieldName: String,
  },
  methods: {
    ...mapMutations([
      'setOption',
    ]),
    ...mapActions([
      'emitChanges',
      'setOptions',
    ]),
    getOption(key) {
      return this.$store.getters.getOption(key);
    },
    toggleChecked(e) {
      const data = {};
      if (e.target.checked) {
        data[this.nameKey] = e.target.value;
      } else {
        data[this.nameKey] = `delete${e.target.value}`;
      }
      this.propChecked = !this.propChecked;
      this.setOptions(data);
      this.emitChanges();
    },
    isShow() {
      return this.fieldName !== 'color' || (this.fieldName === 'color' && !this.passive);
    },
  },
};
</script>
