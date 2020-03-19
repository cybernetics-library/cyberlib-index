<template lang="html">
  <div class='container'>

    <BookPicker
      id='bookpicker'
    />

    <Books
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
</style>
