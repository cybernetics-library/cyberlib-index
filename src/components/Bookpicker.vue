<template lang="html">
<nav class=''>
  <div class='nav-col'>
    <h1 >Cybernetics Library</h1>
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
    <a href='#' @click='$parent.print()'>Print bookmarks
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
      this.$parent.updateFilter(el);
    },
    clear(){
      this.search = '';
      this.currentBook = null;
      this.$parent.clearFilter();
    }
  },
  computed:{
    printGroups(){
      return this.$store.getters.getPrintGroups
    },
    library(){
      return this.$store.getters.getBooks
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
  }
}
</script>

<style lang="css" scoped>



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

@media print {

  nav{
    display: none !important;
  }
}


</style>
