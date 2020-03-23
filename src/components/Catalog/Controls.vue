<template>
  <div class="catalog_controls">
    <div class="catalog_order">
      <span>Сортировать по:</span>
      <a
        id="order_name"
        href="?order_filter[name]=1"
        :class="sort === 'name' ? ' current' : ''"
        v-on:click.prevent="setSort('name')"
      >Названию</a>
      <a
        id="order_price"
        href="?order_filter[price]=1"
        :class="sort === 'price' ? ' current' : ''"
        v-on:click.prevent="setSort('price')"
      >Цене</a>
    </div>
    <div class="catalog_perpage">
      <span>На странице:</span>
      <select id="catalog_perpage" v-on:change="setLimit($event.target.value)">
        <option v-for="(l, index) in limits" :key="index" :value="l" :selected="l === limit">{{ l }}</option>
      </select>
    </div>
    <div class="layout_control">
      <span>Вид:</span>
      <a
        href="#"
        id="layout_0"
        :class="layout === 0 ? `current` : ``"
        v-on:click.prevent="$emit('set-layout', 0)"
      >Плитка</a>
      <a
        href="#"
        id="layout_1"
        :class="layout === 1 ? `current` : ``"
        v-on:click.prevent="$emit('set-layout', 1)"
      >Таблица</a>
      <a
        href="#"
        id="layout_2"
        :class="layout === 2 ? `current` : ``"
        v-on:click.prevent="$emit('set-layout', 2)"
      >Список</a>
    </div>
    <div class="cleaner"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CatalogControls',
  props: {
    layout: Number,
    limit: Number,
    sort: String,
  },
  data() {
    return {
      limits: [12, 24, 48, 96],
    };
  },
  methods: {
    ...mapActions([
      'setOptions',
      'emitChanges',
    ]),
    setLimit(limit) {
      this.setOptions({
        limit,
      });
      this.emitChanges();
    },
    setSort(sort) {
      this.setOptions({
        sort,
      });
      this.emitChanges();
    },
  },
};
</script>
