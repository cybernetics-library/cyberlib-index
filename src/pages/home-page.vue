<template lang="html">
  <div class='container'>

    <BookPicker
      id='bookpicker'
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
      printing:false
    }
  },
  methods:{

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

@media print {

  .navopen{
    width: auto;
    margin-left:0;
  }
}


</style>
