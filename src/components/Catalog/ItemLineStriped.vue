<template>
  <tr class="cat-item-inactive">
    <td class="title_column">
      <a class="title_left"
        :href="item['attribute:link']">
        {{ item['node:text'] }}
      </a>
    </td>
    <td class="prefix_column">
      <span>{{ item['attribute:prefix'] }}</span>
    </td>
    <td>
      Артикул:&nbsp;
      <span>{{ item['attribute:artikul'] }}</span>
    </td>
    <td class="price_column">
      <span class="price">{{ item['attribute:price'] }}</span> <span>руб.</span><span class="">{{ item['attribute:measure'] }}</span>
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
  name: 'CatalogItemLineStriped',
  props: {
    item: Object,
  },
};
</script>
