import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    books:[],
    printGroups:[],
    tagGroups:[],
    date:'',
    currentFilter:null,
  },
  mutations: {
    inputBooks(state, b){
      state.books = b
    },
    inputGroups(state, g){
      state.printGroups = g.p;
      state.tagGroups = g.t;
    },
    inputDate(state){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;

      state.date = today
    },
    inputFilterData(state, filterData){
      state.currentFilter = filterData;
    }
  },
  getters:{
    getBookByID: (state) => (id) => {
      return state.books.find(book => book.Book_ID == id)
    },
    getBooks(state){
      return state.books
    },
    getPrintGroups(state){
      return state.printGroups
    },
    getTags(state){
      return state.tagGroups
    },
    getDate(state){
      return state.date
    },
    getFilterData(state){
      return state.currentFilter
    }
  },
  actions:{
    setBooks(context, b){
      context.commit('inputBooks', b);
    },
    setGroups(context, g){
      context.commit('inputGroups', g);
    },
    setDate(context){
      context.commit('inputDate');
    },
    setFilter(context, filterData){
      context.commit('inputFilterData', filterData);
    }
  }

});
