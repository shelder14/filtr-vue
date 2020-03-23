<template>
  <tr class="cat-item-inactive">
    <td>
      <a
        :href="item['attribute:link']" class="object_item">
        <img
          width="100"
          :alt="item['node:text']"
          :title="item['node:text']"
          :src="item['attribute:img'] && item['attribute:img']['src']"
        />
      </a>
    </td>
    <td class="content_column">
      <a class="title_left"
        :href="item['attribute:link']">
        {{ item['node:text'] }}
      </a>
      <div>Размер: {{ item['attribute:prefix'] }}</div>
      Артикул:&nbsp;
      <span>{{ item['attribute:artikul'] }}</span>
      <div class="obj_short_desc"></div>
    </td>
    <td class="price_column">
      <div class="price">
        <span class="price">{{ item['attribute:price'] }}</span><span class="">руб.</span><span class="">{{ item['attribute:measure'] }}</span>
      </div>
    </td>
    <td class="buy_column">
      <div class="buy_button">
        <a class="button_buy button_buy_order"
          :href="`/emarket/basket/put/element/${item['attribute:id']}/?redirect-uri=/emarket/cart/`"
          :id="`${item['attribute:id']}_add_basket`"
        >КУПИТЬ</a>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CatalogItemLine',
  props: {
    item: Object,
  },
};
</script>
