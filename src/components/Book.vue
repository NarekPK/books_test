<template>
  <div :class="$style['book']">
    <div :class="$style['book__title']">{{ book.name }}</div>
    <div :class="$style['book__description']">{{ book.description }}</div>
    <div :class="$style['book__author']">{{ book.author }}</div>
    <div :class="$style['book__year']">{{ book.year }}</div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Book extends Vue {
  @Prop() book!: {}
}
</script>


<style module lang="scss">
.book {
  width: 200px;
  margin: 20px 10px;
  padding: 10px;
  box-shadow: 0 -4px 4px 0 rgba(0,0,0,.07), 0 5px 5px 0 rgba(0,0,0,.07);
  border-radius: 4px;
  background: #fff;

  &__title {
    font-size: 14px;
    color: #3f51b5;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  &__description {
    font-size: 13px;
    max-height: 150px;
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 5px;
    text-align: justify;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background: #edeef0;
      border-radius: 12px;
    }

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background: #edeef0;
    }

    &::-webkit-scrollbar-thumb {
      background: #3f5060;
      border-radius: 12px;
    }
  }

  &__author {
    font-size: 14px;
    font-style: italic;
    color: #2c3e50;
    font-weight: bold;
  }

  &__year {
    font-size: 14px;
    font-style: italic;
    color: #2c3e50;
    font-weight: bold;
  }
}
</style>