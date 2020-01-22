<template lang="html">
<ol>
  <h2>Or find a book</h2><br>
  <input v-model='search' placeholder="Enter a book title or ISBN" />
  <ul v-if='search'>
    <li v-for="(i, key) in filteredList" :key='key' :class="{'active': currentBook==i, '': !currentBook==i}">
      <a href='#' @click='select(i)'>{{i.title}}</a>
    </li>
  </ul>
</ol>
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
      this.$parent.selectBook(el);
    }
  },
  computed:{
    filteredList() {
      return this.$store.getters.getBooks.filter(book => {
        if (book.title.toLowerCase().includes(this.search.toLowerCase())){
          return book.title.toLowerCase().includes(this.search.toLowerCase())
        }
        if (book.isbn.includes(this.search)){
          return book.isbn.includes(this.search)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
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
ol{
  /* background-color: white; */
  /* padding: 5mm; */
  width: 50%;
}
.active{
  color:red;
}

</style>
