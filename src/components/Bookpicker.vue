<template lang="html">
<nav >
  <!-- <div class='nav-col'>
    <h1 class='-cyber'>Cybernetics Library Index</h1>
  </div> -->

  <div class='nav-col'>
    <h2 class='-cyber'>Search</h2><br>
    <input class='-sans' v-model='search' placeholder="Enter a book title or ISBN" />
    <ol class='search-scroll' v-if='search'>
      <li v-for="(i, key) in filteredList" :key='key' :class="{'active': currentBook==i.Book_ID, '': !currentBook==i.Book_ID  }">
        <a href='#' @click='select([i.Book_ID])'>{{i.Title}}</a>
      </li>
      <li v-if='filteredList.length == 0 && search'>No results.</li>
    </ol>
  </div>

  <div class='nav-col'>
    <h2 class='-cyber'>Select group</h2><br>
    <ol class='group-scroll'>
      <li v-for="(i, key) in printGroups" :key='key' :class="{'active': currentBook==i.books, '': !currentBook==i.books  }">
        <a href='#' @click='select(i.books)'>{{i.name}} ({{i.books.length}})</a>
      </li>
    </ol>
  </div>

  <div class='nav-col'>
    <h2 class='-cyber'>Tags</h2><br>
    <ol class='tag-scroll'>
      <li v-for="(i, key) in tagGroups" :key='key' :class="{'active': currentBook==i.books, '': !currentBook==i.books  }">
        <a href='#' @click='select(i.books)'>{{i.name}} ({{i.books.length}})</a>
      </li>
    </ol>
    <small>Show more</small>
  </div>

  <div class='nav-col'>
    <a id='print-button' href='#' @click='$parent.print()'>Print bookmarks
      <span v-if='currentBook'> ({{currentBook.length}})</span>
      <span v-else> ({{$store.getters.getBooks.length}})</span>
    </a>
  </div>

  <div class='nav-col'>
    <a class='clear' href='#' v-if='currentBook' @click='clear()'>Clear filter ×</a>
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

h2{
  text-transform: uppercase;
  /* font-size: 0.8rem; */
  /* color:grey; */
  /* border: 1px solid black; */
  /* border-radius: 15px; */
  /* padding:5px 8px 7px 8px; */
  width: auto;
  margin-top: 10px;
  /* margin-bottom: 10px; */
}

nav{
  /* width: 300px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  /* font-size: 14pt; */
  color:white;
  /* background-color: white; */
  /* padding:5mm; */
  line-height: 1.2;
  position: fixed;
  z-index: 9999;
  overflow-y: scroll;
}

small{
  font-size: 0.8rem;
}

.nav-col{
  width: 300px;
  margin: 10px 25px;
  /* padding-right: 5mm; */
}


input{
  color:white;
  background-color: transparent;
  border: 1px solid white;
  font-size: 1rem;
  /* padding: 1px 0; */
  width: calc(100% - 25px);
  /* border:1px solid black; */
  padding: 7px 12px 9px;
  /* margin-bottom: 16px; */
  /* border-radius: 80px; */
  /* border-bottom: 1px solid transparent; */

}

input:focus{
  outline: none;
  /* border-bottom: 1px solid black; */

}

.active{
  color:black !important;
  background-color: red !important;
}

.search-scroll{
  width: calc(100% - 25px);

  padding: 7px 12px 9px;
  max-height: 250px;
  overflow: scroll;
  /* font-size: 0.8rem; */
  /* padding: 7px 12px 9px; */

  border: 1px solid white;
  border-top: none;

}

.search-scroll li{

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

.search-scroll li a{
}

.group-scroll li{
  font-size: 0.8rem;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  background-color: whitesmoke;
  color:black;
}

.tag-scroll{
  box-sizing: border-box;

  /* background-color: grey; */
  /* border-radius: 10px; */
  height: 150px;
  overflow: hidden;
  /* padding:5mm; */
  /* border: 1px solid white; */
  /* padding: 7px 12px 9px; */

  font-size: 0.8rem;
}

.tag-scroll li{
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  background-color: whitesmoke;
  color:black;
}

.tag-scroll li:hover{
  /* border: 1px solid */
}

.clear{
  background-color: red;
  color:black;
  padding: 5px;
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
