<template lang="html">
<ol>
  <h2>Choose a collection</h2><br>
  <li v-for='(c, key) in collections' :key='key' :class="{'active': currentCollection==c, '': !currentCollection==c}">
    <a href='#' @click='select(c)'>{{c.name}} ({{c.books.length}})</a>
  </li>
</ol>
</template>

<script>
export default {
  name: 'Collections',
  props:{
    collections:{
      type:Array,
      required:true
    }
  },
  data(){
    return{
      currentCollection:{}
    }
  },
  methods:{
    select(el){
      this.currentCollection = el;
      this.$parent.selectCollection(el);
    }
  },
  computed:{

  }
}
</script>

<style lang="css" scoped>

ol{
  /* background-color: white; */
  /* padding: 5mm; */
}

.active{
  color:red;
}
</style>
