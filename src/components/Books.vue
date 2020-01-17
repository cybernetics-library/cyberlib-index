<template lang="html">
<ol>
  <h2>Books</h2>
  <li v-for='(b, key) in selectBooks' :key='key'>
    <Bookmark
      :bookData='b[0]'
    />
  </li>
</ol>
</template>

<script>
import Bookmark from './Bookmark.vue'

export default {
  name: 'Books',
  components:{
    Bookmark
  },
  props:{
    books:{
      type:Array,
      required:true
    },
    collection:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
    }
  },
  computed:{
    selectBooks(){
      const b = []

      for (var i = 0; i < this.collection.books.length; i++) {
        b.push(this.books.filter(book => book.book_id == this.collection.books[i]))
      }

      return b
    }
  }
}
</script>

<style lang="css" scoped>
li{
  list-style-type: none;
}
</style>
