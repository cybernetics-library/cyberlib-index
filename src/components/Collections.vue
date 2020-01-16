<template lang="html">
<ol>
  <h2>Collections</h2>
  <li v-for='(c, key) in collections' :key='key' @click='select(c)'>
    {{c.name}} ({{c.books.length}})
  </li>
</ol>
</template>

<script>
export default {
  name: 'Collections',
  props:{
    books:{
      type:Array,
      required:true
    },
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
</style>
