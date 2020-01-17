<template lang="html">
<ol>
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
        b.push(this.$store.getters.getBooks.filter(book => book.book_id == this.collection.books[i]))
      }

      return b;
    }
  },
}
</script>

<style lang="css" scoped>
h2{
  width: 100%;
}
li{
  list-style-type: none;
}
ol{
  /* background-color: black; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}


</style>
