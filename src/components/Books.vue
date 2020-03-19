<template lang="html">
<ol>

  <li v-for='(b, key) in bookList' :key='key'>
      <Bookmark
      :bookData='bookByID(b)'
      :isPrint='printing'
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
    printing:{
      type:Boolean,
      required:true
    }
  },
  data(){
    return{
    }
  },
  methods:{

    bookByID(b){
      return this.$store.getters.getBookByID(b)
    },

  },
  computed:{

    filter(){
      return this.$store.getters.getFilterData
    },
    bookList(){
      if(this.$store.getters.getFilterData){
        return this.$store.getters.getFilterData
      }else{
        return this.$store.getters.getBookIDs
      }
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
