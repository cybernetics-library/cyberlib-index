<template lang="html">
<ol>
  <h2>Or find a book</h2><br>
  <input v-model='search' placeholder="Enter a book title" />
  <ul v-if='search'>
    <li v-for="(i, key) in filteredList" :key='key'> {{i.title}} </li>
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
      search:''
    }
  },
  methods:{

  },
  computed:{
    filteredList() {
      return this.$store.getters.getBooks.filter(book => {
        return book.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style lang="css" scoped>

ol{
  /* background-color: white; */
  /* padding: 5mm; */
  width: 50%;
}


</style>
