<template lang="html">
  <div class='container'>

    <BookPicker
      id='bookpicker'
    />

    <Books
      :filter='filter'
    />

  </div>
</template>

<script>
import BookPicker from '../components/Bookpicker.vue'
import Books from '../components/Books.vue'


export default {
  name: 'HomePage',
  components: {
    BookPicker,
    Books
  },
  data(){
    return{
      loaded: false,
      printGroups: null,
      selectedCollection: null,
      selectedBook: null,
      filter:null,
      meta:null
    }
  },
}
</script>

<style lang="css" scoped>
</style>
