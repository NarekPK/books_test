<template>
  <div :class="$style['category']">
    <button :class="[$style['category-inner'], { 'category_active': category.isActive }]"
            @click="changeCategoryState">{{ category.name }}</button>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import CategoryItem from '@/interfaces/CategoryItem'

@Component
export default class Category extends Vue {
  @Prop() category!: CategoryItem
  isActive = this.category.isActive

  changeCategoryState(): void {
    this.$store.commit('changeCategoryState', { 'id': this.category.id, 'isActive': this.isActive })
    this.$store.commit('updateActiveCategories')
    this.loadBooks()
    this.isActive = !this.isActive
  }

  loadBooks(): void {
    const activeCategoriesInfo = this.$store.state.activeCategoriesInfo
    let categoriesInfo
    const page = 1
    
    if (activeCategoriesInfo.length === 0) {
      categoriesInfo = this.$store.state.categoriesInfo
    } else {
      categoriesInfo = activeCategoriesInfo
    }

    const categories = categoriesInfo.map((category: CategoryItem)  => category.id)
    this.getBooks(page, categories)
  }

  @Emit('get-books')
  getBooks(page: number, categories: CategoryItem): {} {
    return { page, categories }
  }
}
</script>


<style module lang="scss">
.category {
  &-inner {
    font-size: 14px;
    color: #3f51b5;
    border: 1px dashed #3f51b5;
    border-radius: 10px;
    padding: 5px 10px;
    background: #fff;
    cursor: pointer;
    margin: 5px;
    outline: none;

    &:hover {
      background: #3f51b5;
      color: #fff;
    }
  }

  :global {
    .category_active {
      background: #3f51b5;
      color: #fff;
    }
  }

}
</style>