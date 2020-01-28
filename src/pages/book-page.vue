<template lang="html">
  <div class='container' v-bind:style="{backgroundImage: 'url(' + currentBook.Cover_URL + ')'}">
    <div class='content'>
      <Checkout :bookData='currentBook'></Checkout>
    </div>

  </div>
</template>

<script>

import Checkout from '../components/Checkout.vue'

export default {
  name:'BookPage',
  components:{
    Checkout
  },
  data(){
    return{
      currentBook: this.$store.getters.getBookByID(this.$route.params.id),
      errorState: false
    }
  },
  created(){
    // setTimeout(function(){
      window.scroll(0, 0);
    // },500)
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
}

/* nested styles in bookmark component */
.outer{
  background-image: none !important;
}


</style>
