<template>
  <div>
    <div class="items_catalog mode1">
      <CatalogControls
        :layout="layout"
        :limit="limit"
        :sort="sort"
        v-on:set-layout="setLayout"
      />

      <ul class="items_catalog" v-if="layout === 0">
        <CatalogItemDefault
          v-for="item in catalog"
          :key="item['attribute:id']"
          :item="item"
        />
      </ul>

      <table class="emarket_table_catalog" v-if="layout === 1">
        <tbody>
          <CatalogItemLine
            v-for="item in catalog"
            :key="item['attribute:id']"
            :item="item"
          />
        </tbody>
      </table>

      <table class="list_table_catalog" v-if="layout === 2">
        <tbody>
          <CatalogItemLineStriped
            v-for="item in catalog"
            :key="item['attribute:id']"
            :item="item"
          />
        </tbody>
      </table>
    </div>

    <CatalogPagination
      v-if="total > limit"
      :limit="limit"
      :total="total"
      :currentPage="currentPage"
      v-on:set-current-page="setCurrentPage"
    />

    <h2 v-if="!catalog.length">Товаров не найдено</h2>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import CatalogItemDefault from '@/components/Catalog/ItemDefault.vue';
import CatalogItemLine from '@/components/Catalog/ItemLine.vue';
import CatalogItemLineStriped from '@/components/Catalog/ItemLineStriped.vue';
import CatalogControls from '@/components/Catalog/Controls.vue';
import CatalogPagination from '@/components/Catalog/Pagination.vue';

export default {
  name: 'Catalog',
  data() {
    return {
      layout: 1,
    };
  },
  computed: {
    ...mapState([
      'catalog',
    ]),
    limit() {
      return parseInt(this.getOption('limit'), 10);
    },
    total() {
      return parseInt(this.$store.state.total, 10);
    },
    currentPage() {
      return parseInt(this.getOption('page'), 10);
    },
    sort() {
      return this.getOption('sort');
    },
  },
  methods: {
    ...mapActions([
      'setOptions',
      'emitChanges',
    ]),
    ...mapMutations([
      'setCatalog',
      'setTotal',
    ]),
    getOption(key) {
      return this.$store.getters.getOption(key);
    },
    setLayout(layout) {
      this.layout = layout;
    },
    setCurrentPage(page) {
      this.setOptions({
        page,
      });
      this.emitChanges();
    },
  },
  components: {
    CatalogItemDefault,
    CatalogItemLine,
    CatalogItemLineStriped,
    CatalogControls,
    CatalogPagination,
  },
  mounted() {
    if (window.CATALOG_JSON) {
      const objects = window.CATALOG_JSON;
      this.setTotal(objects.total);
      if (objects.lines) this.setCatalog(objects.lines['nodes:item'] || []);
    }
  },
};
</script>
