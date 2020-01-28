<template lang="html">
  <div class='container' v-bind:style="{backgroundImage: 'url(' + currentBook.Cover_URL + ')'}">
    <div class='content'>
      <Bookmark :bookData='currentBook'></Bookmark>
    </div>

    <aside>
      <!-- {{currentBook}} -->
    </aside>
  </div>
</template>

<script>

import Bookmark from '../components/Bookmark.vue'

export default {
  name:'BookPage',
  components:{
    Bookmark
  },
  data(){
    return{
      currentBook: this.$store.getters.getBookByID(this.$route.params.id),
      errorState: false
    }
  },
  computed:{

  },
  watch: {
    $route(to, from) {
      if(this.$store.getters.getBookByID(this.$route.params.id)){
        this.currentBook = this.$store.getters.getBookByID(this.$route.params.id);
        this.errorState = false
      }else{
        this.errorState = true
      }
    }
  }
}
</script>

<style lang="css" scoped>
.content{
  margin: 10mm auto;
}
.container{
  display: flex;
  /* color:white; */
  /* padding: 5mm; */
}
aside{
  color:white;
}
</style>
