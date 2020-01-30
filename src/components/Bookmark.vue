<template lang="html">
<router-link class='rl' :to="`/`+bookData.Book_ID">

  <div class='bookmark outer' :id='bookData.Book_ID' v-bind:style="{backgroundImage: 'url(' + bookData.Cover_URL + ')'}">
    <div class='inner' >

      <h3 class='-cyber'>CYBERNETICS LIBRARY</h3>

      <qrcode-vue class='qr' :value="bookData.Cylib_URL"></qrcode-vue>

      <span class='-mono'>https://library.trust.support/</span>
      <h2>{{bookData.Book_ID}}</h2>

      <span class='-mono'>Title</span>
      <h2 :class="{small : isOverflow(bookData.Title)}">{{bookData.Title}}</h2>

      <template v-if='bookData.Author'>
      <span  class='-mono'>Author(s)</span>
      <h2>{{bookData.Author}}</h2>
      </template>

      <template v-else-if='bookData.Secondary_Author'>
      <span >Seconday Author(s)</span>
      <h2>{{bookData.Secondary_Author}}</h2>
      </template>

      <span class='-mono'>Published</span>
      <h2>{{bookData.Date}}</h2>

      <div class='tags -mono' v-if='bookData.Tags'>
        <span>Tags</span>
        <span class='tag' v-for='(t, key) in bookData.Tags' :key='key'>{{t}}</span>
      </div>

      <span class='-mono' v-if='bookData.From_Where'>From: {{bookData.From_Where}}</span>

      <footer class='bookmark-footer -mono'>
        <span >Generated: {{date  }}</span>
        <span>Please do not remove from this book.</span>
      </footer>

    </div>
  </div>
</router-link>

</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'bookmark',
  components:{
    QrcodeVue
  },
  methods:{
    isOverflow(title){
      if (title.length > 100) {
        return true
      }
      return false
    }
  },
  computed:{
    date(){
      return this.$store.getters.getDate
    },
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
  font-size: 12pt;
  padding-right: 0.5pt;
  margin-bottom: 3mm;
  line-height: 1.2;
}

h3{
  font-size: 16.2pt;
  width: 100%;
  text-align: center;
  /* letter-spacing: 1.1pt; */
  margin-bottom: 4mm;
  position: relative;
  /* top:-3.5pt; */
  word-spacing: -0.6pt;
  /* padding-bottom: 3mm; */
  /* border-bottom: 1px solid black; */

}

span{
  font-size: 6pt;
  letter-spacing: 0.1pt;
  margin: 8pt 0 3pt;
  display: block;
}

.qr{
  margin-bottom: 4mm;
}

.small{
  font-size: 10pt;
}

.tag{
  /* font-size: 8pt; */
  display: inline-block;
  padding: 2pt 3pt;
  border-radius: 3pt;
  border: 0.5px solid black;
  /* text-decoration: underline; */
  margin: 0 5pt 4pt 0;
  line-height: 1.5;
}

.tags{
  padding-right: 5mm;
  width: 100%;
}

.bookmark-footer{
  width: calc(100% - 10mm);
  /* border-top: 1px solid black; */
  position: absolute;
  bottom:4mm;
  padding-top: 2.5mm;
  /* text-align: center; */
}

.bookmark-footer span{
  margin: 4pt 0 4pt;
  word-spacing: -0.6pt;
}

.rl:hover{
  text-decoration: none;
}

.bookmark{
  position: relative;
  background-color: white;
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

.inner{
  padding:5mm;
  mix-blend-mode: multiply;
}


/* @media screen (max-width: 400px) {
  .bookmark{
    margin: 0 !important;
  }
} */



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
