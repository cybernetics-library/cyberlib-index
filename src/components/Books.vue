<template lang="html">
<ol>
  <h2>Books</h2>
  <li v-for='(b, key) in selectBooks' :key='key'>
    <img :src='b[0].cover' />
    {{b[0].title}}
  </li>
</ol>
</template>

<script>
export default {
  name: 'Books',
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
</style>
