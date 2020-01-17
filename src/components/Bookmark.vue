<template lang="html">
  <div>
    <qrcode-vue :value="bookData.cyliburl"></qrcode-vue>
    <img :src='bookData.cover' />
    {{bookData.book_id}}
    {{bookData.title}},
    {{bookData.author}},
    {{bookData.publication_date}}
    <div id='placeHolder'></div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'bookmark',
  components:{
    QrcodeVue
  },
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
