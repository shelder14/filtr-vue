<template>
  <form class="filter-item-holder" v-if="filters && Object.keys(filters).length">
    <ul class="js-collection-filters-form">
      <FilterBarParentRow
        v-for="item in filters['nodes:field']"
        :key="item['attribute:guide-id']"
        :item="{ ...item }"
      />
    </ul>
    <input type="hidden" name="filter" value="1" />
    <input class="btn" type="reset" value="Сбросить" v-on:click.prevent="resetFilter" />
  </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import FilterBarParentRow from '@/components/FilterBar/ParentRow.vue';

export default {
  name: 'FilterBar',
  methods: {
    ...mapActions([
      'actualizedFilter',
      'resetFilter',
      'setOptions',
    ]),
    ...mapMutations([
      'setFilters',
    ]),
  },
  components: {
    FilterBarParentRow,
  },
  computed: mapState([
    'filters',
  ]),
  mounted() {
    if (window.FILTER_JSON) {
      const {
        filter_full,
        filter_adaptive,
        category_id,
      } = window.FILTER_JSON;

      this.setOptions({
        category_id,
      });
      if (filter_full) this.setFilters(filter_full || {});
      if (filter_adaptive) this.actualizedFilter(filter_adaptive || {});
    }

    window.document
      .querySelectorAll('.main_catalog_list.filter .current')
      .forEach(el => el.classList.add('subfilter'));
  },
};
</script>
