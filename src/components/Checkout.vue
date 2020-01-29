<template lang="html">
  <div class='checkout'>

      <img v-if="bookData.Cover_URL" :src='bookData.Cover_URL'/>

      <div class='info'>
        <span class='-mono'>CYLIB ID</span>
        <h2 class='-cyber'>{{bookData.Book_ID}}</h2>

        <span class='-mono'>Title</span>
        <h2 class='-cyber'>{{bookData.Title}}</h2>

        <span class='-mono'>Author(s)</span>
        <h2 class='-cyber'>{{bookData.Author}}</h2>

        <span class='-mono'>Language(s)</span>
        <h2 class='-cyber'>{{bookData.Languages}}</h2>

        <span class='-mono'>Published</span>
        <h2 class='-cyber'>{{bookData.Publication}}</h2>

        <span class='-mono'>ISBN</span>
        <h2 class='-cyber'>{{bookData.ISBN}}</h2>

        <div class='tags' v-if='bookData.Tags'>
          <span>Tags</span>
          <h2 class='tag -cyber' v-for='(t, key) in bookData.Tags' :key='key'>{{t}}</h2>
        </div>

        <span class='-mono' v-if='bookData.From_Where'>From</span>
        <h2 class='-cyber'>{{bookData.From_Where}}</h2>

        <footer class='checkout-footer -mono'>
          <span>CYBERNETICS LIBRARY {{bookData.Book_ID}}</span>
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

img{
  max-height: 250px;
  margin-right: 15mm;
}

h2{
  font-size: 20pt;
  padding-right: 0.5pt;
  margin-bottom: 4.5mm;

}
span{
  font-size: 8pt;
  letter-spacing: 0.1pt;
  margin: 8pt 0 4pt;
  display: block;
}


.tag{
  /* font-size: 8pt; */
  display: inline-block;
  border-bottom: 0.05pt solid white;
  /* text-decoration: underline; */
  margin: 0 5pt 0 0;
  /* line-height: 1.5; */
}

.tags{
  /* padding-right: 5mm; */
  width: 100%;
}

.checkout-footer{
  /* position: absolute; */
  /* bottom:4mm; */
}

.checkout-footer span{
  margin: 4pt 0 4pt;
}
.info{

}
.checkout{
  position: relative;
  color:white;
  width: 100%;
  padding: 5mm 15mm;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

</style>
