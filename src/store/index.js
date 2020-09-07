import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    books:[],
    bookIDs:[],
    printGroups:[],
    tagGroups:[],
    date:'',
    currentFilter:null,
    listView:false
  },
  mutations: {
    inputBooks(state, b){
      state.books = b

      var ids = [];

      for (var i = 0; i < b.length; i++) {
        ids.push(b[i].Book_ID)
      }

      state.bookIDs = ids

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
    },
    inputListView(state, isListView){
      state.listView = isListView
    }
  },
  getters:{
    getBookByID: (state) => (id) => {
      return state.books.find(book => book.Book_ID == id)
    },
    getBooks(state){
      return state.books
    },
    getBookIDs(state){
      return state.bookIDs
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
    },
    getListView(state){
      return state.listView
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
    },
    setListView(context, isListView){
      context.commit('inputListView', isListView)
    }
  }

});
