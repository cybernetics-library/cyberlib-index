<template lang="html">
<ol>
  <h2>Choose a collection</h2><br>
  <li v-for='(c, key) in collections' :key='key' >
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
  methods:{
    select(el){
      this.$parent.selectCollection(el);
    }
  }
}
</script>

<style lang="css" scoped>

ol{
  /* background-color: white; */
  /* padding: 5mm; */
}

</style>
