<template lang="html">
<nav >
  <div class='nav-col'>
    <h1 class='-cyber'>Cybernetics Library Index</h1>
  </div>

  <div class='nav-col'>
    <h2>Find a book </h2><br>
    <input class='-sans' v-model='search' placeholder="Enter a book title or ISBN" />
    <ol v-if='search'>
      <li v-for="(i, key) in filteredList" :key='key' :class="{'active': currentBook==i.Book_ID, '': !currentBook==i.Book_ID  }">
        <a href='#' @click='select([i.Book_ID])'>{{i.Title}}</a>
      </li>
    </ol>
  </div>

  <div class='nav-col'>
    <h2>Or select group</h2><br>
    <ol>
      <li v-for="(i, key) in printGroups" :key='key' :class="{'active': currentBook==i.books, '': !currentBook==i.books  }">
        <a href='#' @click='select(i.books)'>{{i.name}} ({{i.books.length}})</a>
      </li>
    </ol>
  </div>

  <div class='nav-col'>
    <h2>Tags</h2><br>
    <ol class='peek'>
      <li v-for="(i, key) in tagGroups" :key='key' :class="{'active': currentBook==i.books, '': !currentBook==i.books  }">
        <a href='#' @click='select(i.books)'>{{i.name}} ({{i.books.length}})</a>
      </li>
    </ol>
  </div>

  <div class='nav-col'>
    <a id='print-button' href='#' @click='$parent.print()'>Print bookmarks
      <span v-if='currentBook'> ({{currentBook.length}})</span>
      <span v-else> ({{$store.getters.getBooks.length}})</span>

    </a><br><br>

    <a href='#' v-if='currentBook' @click='clear()'>Clear filter ×</a>
  </div>

</nav>
</template>

<script>
export default {
  name: 'BookPicker',
  props:{
  },
  data(){
    return{
      search:'',
      currentBook:''
    }
  },
  methods:{
    select(el){
      this.currentBook = el;
      // this.$parent.updateFilter(el);
      // console.log(el);
      this.$store.dispatch('setFilter', el );
    },
    clear(){
      this.search = '';
      this.currentBook = null;
      // this.$parent.clearFilter();
      this.$store.dispatch('setFilter', null);
    }
  },
  computed:{
    tagGroups(){
      return this.$store.getters.getTags
    },
    printGroups(){
      return this.$store.getters.getPrintGroups
    },
    library(){
      return this.$store.getters.getBooks
    },
    filter(){
      return this.$store.getters.getFilterData
    },
    // Should update to v-show for large list performacne
    // https://stackoverflow.com/questions/43913454/vue-v-for-performance-is-poor
    filteredList() {
      return this.$store.getters.getBooks.filter(book => {
        if (book.Title.toLowerCase().includes(this.search.toLowerCase())){
          return book.Title.toLowerCase().includes(this.search.toLowerCase())
        }
        if (book.ISBN.includes(this.search)){
          return book.ISBN.includes(this.search)
        }
      })
    }
  },
  mounted(){
    this.currentBook = this.filter;
  }
}
</script>

<style lang="css" scoped>

h1.-cyber{
  font-size: 15pt;
  text-transform: uppercase;
}

nav{
  display: flex;
  font-size: 14pt;
  background-color: white;
  padding:5mm;
  line-height: 1.2;
}

.nav-col{
  width: 50%;
  padding-right: 5mm;
}


input{
  font-size: 14pt;
  padding: 1px 0;
  width: 100%;
  border:none;
  margin-bottom: 16px;
  border-bottom: 1px solid transparent;

}

input:focus{
  outline: none;
  border-bottom: 1px solid black;

}

.active{
  color:red;
}

.peek{
  height: 250px;
  overflow: scroll;
}



@media screen and (max-width: 450px) {
  nav{
    flex-direction: column;
  }
  .nav-col{
    width: 100%;
  }
  h1{
    margin-bottom: 5mm;
    text-align: center;
  }
  h1.-cyber{
    /* font-size: 20pt; */
  }
  h2{
    /* font-family: 'Plex Mono'; */
    /* font-size: 8pt; */
    /* letter-spacing: 0.5pt; */
    /* text-transform: uppercase; */
  }
  #print-button{
    display: none;
  }
}



@media print {

  nav{
    display: none !important;
  }
}


</style>
