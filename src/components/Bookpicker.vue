<template lang="html">
<nav :class="{'closed': !navOpen}">
 
  <div class='nav-col'>
    <h2 class='-cyber'>Search</h2><br>
    <input class='-sans' v-model='search' placeholder="Enter a book title, author or ISBN" />
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
    <ol class='tag-scroll' :class="{'show-all': showAllTags}">
      <li v-for="(i, key) in tagGroups" :key='key' :class="{'active': currentBook==i.books, '': !currentBook==i.books  }">
        <a v-if='i.books.length > 2' href='#' @click='select(i.books)'>{{i.name}} ({{i.books.length}})</a>
        <a v-else href='#' @click='select(i.books)'>{{i.name}}</a>
      </li>
    </ol>
    <small v-if='!showAllTags' @click='toggleTags'>Show more</small>
    <small class='sticky' v-else @click='toggleTags'>Show less</small>
  </div>

  <div class='nav-col'>
    <h2 class='-cyber'>View</h2><br>
    <a  class='toggle' href='#' @click="toggleView('bookmark')" :class="{'active': !listView}">Bookmark view</a>
    <a  class='toggle' href='#' @click="toggleView('list')" :class="{'active': listView}">List view</a>
  </div>

  <div class='nav-col'>
    <a id='print-button' href='#' @click='$parent.print()'>Print bookmarks
      <span v-if='currentBook'> ({{currentBook.length}})</span>
      <span v-else> ({{$store.getters.getBooks.length}})</span>
    </a>
  </div>

  <div class='nav-col'>
    <a class='clear -mono' href='#' v-if='currentBook' @click='clear()'>Clear filter ×</a>
  </div>



</nav>
</template>

<script>
export default {
  name: 'BookPicker',
  props:{
    navOpen:{
      type:Boolean,
      required:false
    }
  },
  data(){
    return{
      search:'',
      currentBook:'',
      showAllTags:false,
      listView:false,
    }
  },
  methods:{
    select(el){
      this.currentBook = el;
      this.$store.dispatch('setFilter', el );

      var that = this;

      setTimeout(function(){
        that.$emit('closenav');
      },300)
    },
    clear(){
      this.search = '';
      this.currentBook = null;
      // this.$parent.clearFilter();
      this.$store.dispatch('setFilter', null);
    },
    toggleTags(){
        console.log('yo');
        if(!this.showAllTags){
          this.showAllTags = true
        }else{
          this.showAllTags = false
        }
    },
    toggleView(view){
        this.$emit('closenav');

        if(view == 'list'){
          this.$store.dispatch('setListView', true);
          this.listView = true;
        }else{
          this.$store.dispatch('setListView', false);
          this.listView = false;
        }
    },

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
        if (book.Author.toLowerCase().includes(this.search.toLowerCase())){
          return book.Author.toLowerCase().includes(this.search.toLowerCase())
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
  width: auto;
  margin-top: 10px;
}

nav{
  height: 100%;
  display: flex;
  flex-direction: column;
  color:white;
  line-height: 1.2;
  position: fixed;
  z-index: 9998;
  overflow-y: scroll;
  transition:all 250ms ease;
}


small{
  font-size: 0.8rem;
  padding: 5px 0;
  background-color: black;
}

small.sticky{
  position: sticky;
  bottom:15px;
  padding:5px;
  cursor: pointer;

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
  width: calc(100% - 25px);
  padding: 7px 12px 9px;
}

input:focus{
  outline: none;
}

.active{
  color:black !important;
  background-color: grey !important;
}

.search-scroll{
  width: calc(100% - 25px);

  padding: 7px 12px 9px;
  max-height: 250px;
  overflow: scroll;
  border: 1px solid white;
  border-top: none;

}

.search-scroll li{

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
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
  height: 150px;
  overflow: hidden;
  font-size: 0.8rem;
}

.tag-scroll.show-all{
  overflow: visible;
  height: auto;
}

.tag-scroll li{
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  background-color: whitesmoke;
  color:black;
}

.clear{
  margin-top:1rem;
  font-size:0.8rem;
  text-transform: uppercase;
  padding: 8px;
  border:1px solid white;
}

.toggle{
  font-size: 0.8rem;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  background-color: whitesmoke;
  color:black;
}


@media screen and (max-width: 450px) {
  nav{
    flex-direction: column;
    background-color: black;
  }

  nav.closed{
    transform: translateX(-100%);
  }

  .nav-col{
    width: calc(100vw - 50px);
  }
  h1{
    margin-bottom: 5mm;
    text-align: center;
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
