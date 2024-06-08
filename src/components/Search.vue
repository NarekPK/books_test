<template>
  <div :class="$style['search']">
    <svg viewBox="0 0 512 512" :class="$style['search__svg']">
      <path fill="#3f51b5" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
    </svg>
    <input :class="$style['search__input']"
            type="text"
            name="search"
            placeholder="Найти"
            v-model="searchInput"
            @input="startSearch(searchInput)"
    >
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Search extends Vue {
  searchInput = this.$store.state.inputQuery

  startSearch(query: string) {
    this.$store.commit('setInputQuery', query)
  }
}
</script>


<style module lang="scss">
.search {
  position: relative;
  width: 200px;
  margin: 0 auto;

  &__input {
    font-size: 14px;
    color: #3f51b5;
    border: 1px solid #3f51b5;
    border-radius: 4px;
    padding: 10px 10px 10px 35px;
    background: #fff;
    margin: 5px;
    width: 100%;
    outline: none;

    &:hover,
    &:focus {
      box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.07), 0 5px 5px 0 rgba(0, 0, 0, 0.07);
    }
  }

  &__svg {
    position: absolute;
    top: 13px;
    left: 13px;
    width: 20px;
  }

}
</style>