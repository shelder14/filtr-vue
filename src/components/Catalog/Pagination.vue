<template>
  <div class="catalog_numpages">
    <div class="numpages">
      <ul>
        <li class="numpages_li toprev_link"
          v-if="viewPrev"
        >
          <a
            :href="`?p=${currentPage - 1}`"
            v-on:click.prevent="$emit('set-current-page', currentPage - 1)"
          ><span>Предыдущая</span></a>
        </li>
        <li
          v-for="(page, index) in viewPages"
          :key="index"
          :class="`numpages_li ${page === spacer ? ' no_link' : ''} ${page === currentPage ? ' active' : ''}`"
        >
          <a
            v-if="page !== spacer"
            :href="`?p=${page}`"
            v-on:click.prevent="$emit('set-current-page', page)"
          ><span>{{ page }}</span></a>
          <span v-if="page === spacer">{{ spacer }}</span>
        </li>
        <li class="numpages_li tonext_link"
          v-if="viewNext"
        >
          <a
            :href="`?p=${currentPage + 1}`"
            v-on:click.prevent="$emit('set-current-page', currentPage + 1)"
          ><span>Следующая</span></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogPagination',
  data() {
    return {
      startViewPages: 1,
      middleViewPages: 4,
      endViewPages: 1,
      spacer: '...',
    };
  },
  props: {
    limit: Number,
    total: Number,
    currentPage: Number,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },
    viewLeftSpacer() {
      return this.currentPage > this.startViewPages + this.middleViewPages + 1;
    },
    viewRightSpacer() {
      return this.currentPage < this.totalPages - (this.endViewPages + this.middleViewPages);
    },
    viewPrev() {
      return this.currentPage > 1;
    },
    viewNext() {
      return this.currentPage < this.totalPages;
    },
    viewPages() {
      const startPoint = (this.currentPage - this.middleViewPages > this.startViewPages)
        ? (this.currentPage - this.middleViewPages)
        : (1 + this.startViewPages);

      const endPoint = (this.currentPage + this.middleViewPages < this.totalPages - this.endViewPages)
        ? (this.currentPage + this.middleViewPages)
        : (this.totalPages - this.endViewPages);

      const viewPages = [];

      for (let i = 1; i <= this.startViewPages; i++) {
        viewPages.push(i);
      }
      if (this.viewLeftSpacer) {
        viewPages.push(this.spacer);
      }
      for (let i = startPoint; i <= endPoint; i++) {
        viewPages.push(i);
      }
      if (this.viewRightSpacer) {
        viewPages.push(this.spacer);
      }
      for (let i = this.totalPages - this.endViewPages + 1; i <= this.totalPages; i++) {
        viewPages.push(i);
      }
      return viewPages;
    },
  },
};
</script>
