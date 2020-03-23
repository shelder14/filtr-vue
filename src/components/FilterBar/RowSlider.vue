<template>
  <ul :class="`f${fieldName}`">
    <li>
      <span class="s1">От</span>
      <input
        class="inp1"
        type="text"
        :name="minNameKey"
        :alt="minInitValue"
        :rel="min"
        v-model="min"
        v-on:change="syncSlider"
      />
      <span class="s1 s2">До</span>
      <input
        class="inp1"
        type="text"
        :name="maxNameKey"
        :alt="maxInitValue"
        :rel="max"
        v-model="max"
        v-on:change="syncSlider"
      />
    </li>
    <li>
      <div class="slider" :id="`${fieldName}-slider`"></div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

const $ = window.jQuery;

export default {
  name: 'FilterBarRowSlider',
  data() {
    const data = {
      nameKey: `fields_filter[${this.fieldName}]`,
      min: this.minInitValue,
      max: this.maxInitValue,
    };
    data.minNameKey = `${data.nameKey}[0]`;
    data.maxNameKey = `${data.nameKey}[1]`;
    return data;
  },
  props: {
    item: Object,
    actualItem: Object,
    fieldName: String,
    minInitValue: Number,
    maxInitValue: Number,
  },
  methods: {
    ...mapMutations([
      'setOption',
    ]),
    ...mapActions([
      'setOptions',
      'emitChanges',
    ]),
    getOption(key) {
      return this.$store.getters.getOption(key);
    },
    syncSlider() {
      if (typeof this.$slider !== 'undefined') {
        this.$slider.slider('values', [this.min, this.max]);
        this.setOptions({
          [this.fieldName]: {
            min: this.min,
            max: this.max,
          },
        });
        this.emitChanges();
      }
    },
  },
  computed: {
    localMinInitValue() {
      const { minInitValue } = this;
      return minInitValue;
    },
    localMaxInitValue() {
      const { maxInitValue } = this;
      return maxInitValue;
    },
  },
  mounted() {
    const initValues = this.getOption(this.nameKey);
    if (initValues && initValues.length) {
      const [min, max] = initValues;
      this.min = min;
      this.max = max;
    }

    if (typeof $ !== 'undefined') {
      const sliderOptions = {
        min: this.localMinInitValue,
        max: this.localMaxInitValue,
        values: [this.min, this.max],
        // step: Math.ceil((this.maxValue - this.minValue) / 100),
        range: true,
        slide: (event, ui) => {
          const [uiMin, uiMax] = ui.values;
          // refresh inputs
          this.min = uiMin;
          this.max = uiMax;
        },
        stop: (event, ui) => {
          const [uiMin, uiMax] = ui.values;
          // refresh product items
          const data = {
            [this.fieldName]: {
              min: uiMin,
              max: uiMax,
            },
          };
          this.setOptions(data);
          this.emitChanges();
        },
      };
      this.$slider = $(`#${this.fieldName}-slider`);
      this.$slider.slider(sliderOptions);
    }
  },
  updated() {
    if (this.$slider) {
      const options = {
        min: this.localMinInitValue,
        max: this.localMaxInitValue,
      };
      if (this.min < this.localMinInitValue) {
        this.min = this.localMinInitValue;
        options.min = this.localMinInitValue;
      }
      if (this.max > this.localMaxInitValue) {
        this.max = this.localMaxInitValue;
        options.max = this.localMaxInitValue;
      }
      this.$slider.slider('option', options);
    }
  },
};
</script>
