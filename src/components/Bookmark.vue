<template lang="html">
  <div class='bookmark outer' :id='bookData.Book_ID' v-bind:style="{backgroundImage: 'url(' + bookData.Cover_URL + ')'}">
    <div class='inner' >
      <qrcode-vue class='qr' :value="bookData.Cylib_URL"></qrcode-vue>
      <span>CYLIB ID</span>
      <h2>{{bookData.Book_ID}}</h2>

      <span>Title</span>
      <h2>{{bookData.Title}}</h2>

      <span>Author(s)</span>
      <h2>{{bookData.Author}}</h2>

      <span>Published</span>
      <h2>{{bookData.Date}}</h2>

      <div class='tags' v-if='bookData.Tags'>
        <span>Tags</span>
        <span class='tag' v-for='(t, key) in bookData.Tags' :key='key'>{{t}}</span>
      </div>

      <span v-if='bookData.From_Where'>From: {{bookData.From_Where}}</span>

      <span class='bottom'>Please do not remove from this book<br>THE CYBERNETICS LIBRARY</span>
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
/* @import url(".../assets/css/fonts.css"); */

h2{
  font-size: 14pt;
  padding-right: 0.5pt;
}
span{
  font-size: 7pt;
  letter-spacing: 0.1pt;
  margin: 8pt 0 5pt;
  display: block;
  font-family: 'Plex Mono', Courier, monospace;
}

.qr{
  margin-bottom: 5pt;

}

.tag{
  /* font-size: 8pt; */
  display: inline-block;
  /* border-bottom: 0.1pt solid black; */
  /* text-decoration: underline; */
  margin: 0 3pt 3pt 0;
}

.tags{
  padding-right: 5mm;
  width: 100%;
}

.bottom{
  position: absolute;
  bottom:4mm;
  line-height: 1.2;
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
