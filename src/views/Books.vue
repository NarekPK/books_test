<template>
  <div :class="$style['main']">
    <Loading :is-loading="isLoading" />
    <header :class="$style['main__header']">Книги</header>
    <div :class="$style['categories']">
      <Category 
        v-for="category in categoriesInfo"
        :key="category.id"
        :category="category"
        @get-books="getBooks"
      />
    </div>
    <Search />
    <div :class="$style['books']">
      <Book 
        v-for="book in booksInfo.list"
        :key="book.name"
        :book="book"
      />
    </div>
    <button 
      v-if="booksInfo.next" 
      :class="$style['button-more']"
      @click="loadMore"
    >Загрузить ещё</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loading from '@/components/Loading.vue'
import Category from '@/components/Category.vue'
import Search from '@/components/Search.vue'
import Book from '@/components/Book.vue'
import CategoryItem from '@/interfaces/CategoryItem'

@Component({
  components: {
    Loading,
    Category,
    Search,
    Book
  },
})
export default class Books extends Vue {
  isLoading = true

  get categoriesInfo(): [] {
    return this.$store.state.categoriesInfo
  }

  get booksInfo(): [] {
    return this.$store.state.booksInfo
  }

  getAllCategories(): void {
    this.$store.dispatch('getAllCategoriesInfo').then(() => {
      const categoriesInfo = this.$store.state.categoriesInfo
      const categories: CategoryItem[] = categoriesInfo.map((category: CategoryItem) => category.id)
      const page = 1
      this.getBooks({ page, categories })
    })
  }

  getBooks({ page, categories }: { page: number; categories: CategoryItem[] }): void {
    this.isLoading = true
    this.$store.dispatch('getBooksInfo', { page, categories }).then(() => {
      this.isLoading = false
    })
  }

  loadMore(): void {
    const page = this.$store.state.booksInfo.page + 1
    const activeCategoriesInfo = this.$store.state.activeCategoriesInfo
    let categoriesInfo
    if (activeCategoriesInfo.length === 0) {
      categoriesInfo = this.$store.state.categoriesInfo;
    } else {
      categoriesInfo = activeCategoriesInfo
    }
      
    const categories = categoriesInfo.map((category: CategoryItem) => category.id)
    this.getBooks({ page, categories })
  }

  created(): void {
    if (!localStorage.getItem('BooksStorage')) {
      this.getAllCategories()
    } else {
      this.isLoading = false
    }
  }
}
</script>


<style module lang="scss">
.main {
  max-width: 1200px;
  margin: 0 auto 15px;

  &__header {
    font-size: 34px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    margin: 20px 0;
  }

}

.categories {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}

.books {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;
}

.button-more {
  font-size: 16px;
  color: #fff;
  border: 1px solid #137bce;
  border-radius: 10px;
  padding: 5px 10px;
  background: #137bce;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;

  &:hover {
    background: #fff;
    color: #137bce;
  }
}
</style>