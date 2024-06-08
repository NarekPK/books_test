import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from 'axios'
import CategoryItem from '@/interfaces/CategoryItem'

const persistedState = createPersistedState({
  key: 'BooksStorage'
})


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoriesInfo: [],
    booksInfo: {
      page: 1,
      list: []
    },
    activeCategoriesInfo: [],
    inputQuery: ''
  },
  getters: {
  },
  mutations: {
    addAllCategoriesInfo(state, responseData) {
      let categories = responseData.data.list
      categories = categories.map((category: CategoryItem) => {
        category.isActive = false
        return category
      })
      state.categoriesInfo = categories
    },
    addBooksInfo(state, responseData) {
      const currentBooksList = state.booksInfo.list.concat(responseData.data.list)
      state.booksInfo = responseData.data
      if (state.booksInfo.page !== 1) { 
        state.booksInfo.list = currentBooksList
      }
    },
    changeCategoryState(state, categoryInfo) {
      state.categoriesInfo.forEach((category: CategoryItem) => {
        if (category.id === categoryInfo.id) {
          category.isActive = !categoryInfo.isActive
        }
      })
    },
    updateActiveCategories(state) {
      const categoriesInfo = state.categoriesInfo
      state.activeCategoriesInfo = categoriesInfo.filter((category: CategoryItem) => category.isActive)
    },
    setInputQuery(state, query) {
      state.inputQuery = query
    }
  },
  actions: {
    async getAllCategoriesInfo(context) {
      try {
        const response = await axios
          .post('https://webdev.modumlab.com/api/book/categories')

        context.commit('addAllCategoriesInfo', response.data)
      } catch(error) {
        console.error(error)
      }
    },
    async getBooksInfo(context, { page, categories }) {
      try {
        const response = await axios
          .post('https://webdev.modumlab.com/api/book/list',
                  {
                    categories: categories,
                    page: page
                  }
                )

        context.commit('addBooksInfo', response.data)
      } catch(error) {
        console.error(error)
      }
    },
  },
  modules: {
  },
  plugins: [persistedState],
  strict: process.env.NODE_ENV !== 'production'
})
