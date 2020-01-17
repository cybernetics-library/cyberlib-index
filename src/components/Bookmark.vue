<template lang="html">
  <div class='bookmark outer' :id='bookData.book_id' v-bind:style="{backgroundImage: 'url(' + bookData.cover + ')'}">
    <div class='inner' >
      <qrcode-vue class='qr' :value="bookData.cyliburl"></qrcode-vue>
      <!-- <img :src='bookData.cover' /> -->
      <span>CYLIB ID</span>
      <h2>{{bookData.book_id}}</h2>

      <span>Title</span>
      <h2>{{bookData.title}}</h2>

      <span>Author(s)</span>
      <h2>{{bookData.author}}</h2>

      <span>Published</span>
      <h2>{{bookData.publication_date}}</h2>

      <div class='tags' v-if='bookData.tags'>
        <span>Tags</span>
        <span class='tag' v-for='(t, key) in bookData.tags' :key='key'>{{t}}</span>

      </div>

      <!-- <span>ISBN {{bookData.isbn}}</span> -->

      <span class='bottom'>Please do not remove this slip from book</span>
    </div>
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

h2{
  font-size: 14pt;
  padding-right: 0.5pt;
}
span{
  font-size: 8pt;
  margin: 8pt 0 4pt;
  display: block;
}

.qr{
  margin-bottom: 5pt;

}

.tag{
  font-size: 8pt;
  display: inline-block;
  /* border-bottom: 0.1pt solid black; */
  /* text-decoration: underline; */
  margin: 0 5px 5px 0;
}

.tags{
  padding-right: 5mm;
  width: 100%;
}

.bottom{
  position: absolute;
  bottom:5mm;
}
.bookmark{
  position: relative;
  background-color: white;
  /* border: 0.25pt solid black; */
  box-sizing: border-box;
  width: 65mm;
  height: 180mm;
  margin: 5mm 4mm 25mm;

}
.outer{
  background-image: none ;
}
.outer:hover{
  background-image: none !important;
}

.outer:hover .inner{
  /* opacity: 1; */
}

.inner{
  padding:5mm;
  mix-blend-mode: multiply;
  /* opacity: 0; */
}


@media print {

  .bookmark{
    border: none;
  }


  .outer::before{
    position: absolute;
    display: block;
    content:' ';
    top:-3mm;
    left:-3mm;
    height: 3mm;
    width: 3mm;
    border-right: 0.25pt solid black;
    border-bottom: 0.25pt solid black;
  }

  .outer::after{
    position: absolute;
    display: block;
    content:' ';
    bottom:-3mm;
    right:-3mm;
    height: 3mm;
    width: 3mm;
    border-left: 0.25pt solid black;
    border-top: 0.25pt solid black;
  }

  .inner::before{
    position: absolute;
    display: block;
    content:' ';
    top:-3mm;
    right:-3mm;
    height: 3mm;
    width: 3mm;
    border-left: 0.25pt solid black;
    border-bottom: 0.25pt solid black;
  }

  .inner::after{
    position: absolute;
    display: block;
    content:' ';
    bottom:-3mm;
    left:-3mm;
    height: 3mm;
    width: 3mm;
    border-right: 0.25pt solid black;
    border-top: 0.25pt solid black;
  }

}
img{
  /* max-width: 300mm; */
}
</style>
