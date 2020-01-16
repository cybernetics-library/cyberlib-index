<template lang="html">
<ol>
  <h2>Collections</h2>
  <li v-for='(c, key) in collections' :key='key'>
    {{c.name}} ({{c.books.length}})
  </li>
</ol>
</template>

<script>
export default {
  name: 'selection',
  props:{
    books:{
      type:Array,
      required:true
    },
    collections:{
      type:Array,
      required:true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
