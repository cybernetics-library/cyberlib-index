<template lang="html">
<ol>

  <li v-for='(b, key) in bookList' :key='key'>
      <Bookmark
      :bookData='bookDataMask(b)'
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

  },
  data(){
    return{
    }
  },
  methods:{
    findByID(id){
      return this.$store.getters.getBooks.find(x => x.Book_ID === id)
    },
    bookDataMask(b){
      if(this.$store.getters.getFilterData){
        return this.findByID(b)
      }else{
        return b
      }
    }
  },
  computed:{
    filter(){
      return this.$store.getters.getFilterData
    },
    bookList(){
      if(this.$store.getters.getFilterData){
        return this.$store.getters.getFilterData
      }else{
        return this.$store.getters.getBooks
      }
    }

    // Should update to v-show for large list performacne
    // https://stackoverflow.com/questions/43913454/vue-v-for-performance-is-poor

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
  /* justify-content: space-around; */
}

@media screen and (max-width: 450px) {
  li{
    width: calc(50% - 7.5px);
    margin: 5px 0 0 5px;
  }
}

@media print {

  li:nth-of-type(4n+1){
    margin-left: 10mm !important;
  }
}


</style>
