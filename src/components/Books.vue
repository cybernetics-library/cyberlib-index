<template lang="html">
<ol>

  <template v-if='filter'>
  <li v-for='(b, key) in filter' :key='key'>
      <Bookmark
        :bookData='findByID(b)'
      />
  </li>
  </template>

  <template v-else>
  <li v-for='(b, key) in this.$store.getters.getBooks' :key='key'>
      <Bookmark
        :bookData='b'
      />
  </li>
  </template>

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
    filter:{
      type:Array,
      required:false
    }
  },
  data(){
    return{
    }
  },
  methods:{
    findByID(id){
      return this.$store.getters.getBooks.find(x => x.Book_ID === id)
    }
  },
  computed:{
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
