import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    books:[],
    printGroups:[],
    tagGroups:[]
  },
  mutations: {
    inputBooks(state, b){
      state.books = b
    },
    inputGroups(state, g){
      state.printGroups = g.p;
      state.tagGroups = g.x;
    }
  },
  getters:{
    getBooks(state){
      return state.books
    },
    getPrintGroups(state){
      return state.printGroups
    }
  },
  actions:{
    setBooks(context, b){
      context.commit('inputBooks', b);
    },
    setGroups(context, g){
      context.commit('inputGroups', g);
    }
  }

});
