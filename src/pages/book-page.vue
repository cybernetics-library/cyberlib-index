<template lang="html">
  <div class='container' >
    <div class='content'>
      <Checkout :bookData='currentBook'></Checkout>
    </div>

    <router-link class='back' to="/">↩</router-link>

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
  margin: 0 auto;
  width: 800px;

  /* background-color: red; */
}
.container{
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.back{
  position: fixed;
  top:0;
  left:0;
  color:white;
  padding: 5mm;
}

@media screen and (max-width: 450px) {
  .container{
    padding-top: 20px;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

</style>
