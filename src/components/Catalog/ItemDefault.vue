<template>
  <li class="objectlist cat-item-active">
    <a class="object_item"
      :href="item['attribute:link']"
    >
      <img
        :alt="item['node:text']"
        :title="item['node:text']"
        :src="item['attribute:img'] && item['attribute:img']['src']"
      />
    </a>
    <div class="object_title">
      <a :href="item['attribute:link']">
        {{ item['node:text'] }}
      </a>
    </div>
    <div class="prefix">Размер: {{ item['attribute:prefix'] }}</div>
    <div class="price">
      <span class="price_value">{{ item['attribute:price'] }}</span>&nbsp;<span class="price_currency">руб.</span><span class="currency">{{ item['attribute:measure'] }}</span>
    </div>
    <div class="buy_button">
      <a class="button_buy button_buy_order"
        :href="`/emarket/basket/put/element/${item['attribute:id']}/?redirect-uri=/emarket/cart/`"
        :id="`${item['attribute:id']}_add_basket`"
      >КУПИТЬ</a>
    </div>
  </li>
</template>

<script>
export default {
  name: 'CatalogItemDefault',
  props: {
    item: Object,
  },
};
</script>
