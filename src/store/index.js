import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    books:[]
  },
  mutations: {
    inputBooks(state, b){
      state.books = b
    }
  },
  getters:{
    getBooks(state){
      return state.books
    }
  },
  actions:{
    setBooks(context, b){
      context.commit('inputBooks', b);
    }
  }

});
