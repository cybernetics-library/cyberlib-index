<template lang="html">
  <div class='checkout outer' :id='bookData.Book_ID' v-bind:style="{backgroundImage: 'url(' + bookData.Cover_URL + ')'}">
    <div class='inner' >
      <!-- <span class='-mono'>CYLIB ID</span>
      <h2>{{bookData.Book_ID}}</h2> -->

      <span class='-mono'>Title</span>
      <h2>{{bookData.Title}}</h2>

      <span class='-mono'>Author(s)</span>
      <h2>{{bookData.Author}}</h2>

      <span class='-mono'>Language(s)</span>
      <h2>{{bookData.Languages}}</h2>

      <span class='-mono'>Published</span>
      <h2>{{bookData.Publication}}</h2>

      <span class='-mono'>ISBN</span>
      <h2>{{bookData.ISBN}}</h2>

      <div class='tags' v-if='bookData.Tags'>
        <span>Tags</span>
        <h2 class='tag' v-for='(t, key) in bookData.Tags' :key='key'>{{t}}</h2>
      </div>

      <span class='-mono' v-if='bookData.From_Where'>From</span>
      <h2>{{bookData.From_Where}}</h2>

      <footer class='checkout-footer -mono'>
        <span>THE CYBERNETICS LIBRARY {{bookData.Book_ID}}</span>
      </footer>

    </div>
  </div>
</template>

<script>

export default {
  name: 'checkout',
  components:{

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
  font-size: 7pt;
  letter-spacing: 0.1pt;
  margin: 8pt 0 4pt;
  display: block;
}

.qr{
  margin-bottom: 5pt;

}

.tag{
  /* font-size: 8pt; */
  display: inline-block;
  border-bottom: 0.05pt solid black;
  /* text-decoration: underline; */
  margin: 0 5pt 0 0;
  /* line-height: 1.5; */
}

.tags{
  padding-right: 5mm;
  width: 100%;
}

.checkout-footer{
  position: absolute;
  bottom:4mm;
}

.checkout-footer span{
  margin: 4pt 0 4pt;
}


.checkout{
  position: relative;
  background-color: white;
  box-sizing: border-box;
  width: 100%;
  height: 180mm;
  margin: 5mm 0 25mm 0;

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


@media print {

  .checkout{
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
