<template lang="html">
<nav>

  <div>
    <h1>Cybernetics Library</h1>
  </div>

  <div>
    <h2>Find a book</h2><br>
    <input v-model='search' placeholder="Enter a book title or ISBN" />
    <ul v-if='search'>
      <li v-for="(i, key) in filteredList" :key='key' :class="{'active': currentBook==i, '': !currentBook==i}">
        <a href='#' @click='select(i)'>{{i.Title}}</a>
      </li>
    </ul>
  </div>

  <div>
    <a href='#' @click='clear()'>Clear filter</a>
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
      this.$parent.updateFilter([el]);
    },
    clear(){
      this.search = '';
      this.currentBook = null;
      this.$parent.clearFilter();
    }
  },
  computed:{
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
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding:5mm;
}

input{
  font-size: 16px;
  padding: 1px 0;
  font-family: Times;
  width: 200px;
  border:none;
  border-bottom: 1px solid black;
  margin-bottom: 16px;
  /* padding:5mm; */
}
ul{

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
