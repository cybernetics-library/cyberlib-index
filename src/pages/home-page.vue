<template lang="html">
  <div class='container'>
    <div class='mob-menu' @click="toggleNav">{{navText}}</div>

    <BookPicker
      id='bookpicker'
      :navOpen="navOpen"
      @closenav="closeNav"
    />

    <Books
      class='navopen'
      :printing='printing'
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
      filter:null,
      meta:null,
      printing:false,
      navOpen:false,
      navText:"Menu ="
    }
  },
  methods:{
    toggleNav(){
      console.log('yo');
      if(!this.navOpen){
        this.navOpen = true;
        this.navText = "Close ×";
      } else {
        this.navOpen = false;
        this.navText = "Menu =";
      }
    },

    closeNav(){
        this.navOpen = false;
        this.navText = "Menu =";
    },

    print(){
      this.printing = true;

      this.$nextTick(function(){
        window.print();
      })

      this.$nextTick(function(){
        this.printing = false;
      })


    }
  },

}
</script>

<style lang="css" scoped>

.container{
  /* display: flex */
}

.navopen{
  width: calc(100% - 360px);
  margin-left:360px;
}

.mob-menu{
  display: none;
}

@media screen and (max-width: 450px) {
  .navopen{
    width: calc(100%);
    margin-left:0;
  }

  .mob-menu{
    font-size: 0.9rem;
    position: fixed;
    right:18px;
    top:18px;
    display: block;
    border: 1px solid white;
    background: black;
    padding: 3px 5px 4px 5px;
    border-radius: 2px;
    z-index: 9999;
    color:white;
  }
}

@media print {

  .navopen{
    width: auto;
    margin-left:0;
  }
}


</style>
