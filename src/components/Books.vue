<template lang="html">
<div>
<ol v-if="!listView" class='bookmark-view'>
  <li  v-for='(b, key) in bookList' :key='key'>
      <Bookmark
      :bookData='bookByID(b)'
      :isPrint='printing'
      />
  </li>
</ol>

<ol v-else class='list-view'>
  
  <li  v-for='(b, key) in bookList' :key='key'>
      <BookListItem
      :bookData='bookByID(b)'
      />
  </li>
</ol>
</div>
</template>

<script>
import Bookmark from './Bookmark.vue'
import BookListItem from './Book-list.vue'

export default {
  name: 'Books',
  components:{
    Bookmark,
    BookListItem
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
    },
    listView(){
      return this.$store.getters.getListView
    },

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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

ol.list-view li{
  width:100%;
}

ol.list-view{
  width:calc(100% - 4rem);
  margin:0 2rem;
  padding:2rem 0;
}

@media screen and (max-width: 450px) {
  li{
    width: calc(50% - 7.5px);
    margin: 5px 0 0 5px;
  }

  ol.list-view li{
    margin:0;
  }

  ol.list-view{
  width:calc(100% - 2rem);
  margin:0 1rem;
  padding:1rem 0;
}
}

@media print {

  li:nth-of-type(4n+1){
    margin-left: 10mm !important;
  }
}


</style>
