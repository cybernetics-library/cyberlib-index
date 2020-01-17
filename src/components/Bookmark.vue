<template lang="html">
  <div>
    <img :src='bookData.cover' />
    {{bookData.book_id}}
    {{bookData.title}},
    {{bookData.author}},
    {{bookData.publication_date}}
  </div>
</template>

<script>
export default {
  name: 'bookmark',
  props:{
    bookData:{
      type:Object,
      required:true
    }
  }
}
</script>

<style lang="css" scoped>
img{
  max-width: 100px;
}
</style>
