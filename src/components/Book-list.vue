<template lang="html">
<router-link class='rl' :to="`/`+bookData.Book_ID">
  <div class="list-outer">
    <div class="col -mono">{{bookData.Title}}</div>
    <div class="col -mono">{{bookData.Author}}</div>
    <div class="col -mono">{{bookData.Date}}</div>
  </div>
</router-link>

</template>

<script>

export default {
  name: 'booklist',
  props:{
    bookData:{
      type:Object,
      required:true
    }
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


}
</script>

<style lang="css" scoped>
.list-outer{
  width: 100%;
  color:rgba(255,255,255,0.7);
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: space-between;
  font-size:1rem;
  border-bottom:1px solid rgba(255,255,255,0.2);
}

.list-outer:hover{
  color:white;
  border-bottom: 1px solid white;
}

.col{
  /* width:30%; */
  padding-bottom: 0.6rem;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y:visible;
  white-space: nowrap;
}

.col:nth-of-type(1){
  width:60%;
}

.col:nth-of-type(2){
  width:20%;
}

a{
  border-color: white;
}

@media screen and (max-width: 450px) {
  .list-outer{
    font-size:0.7rem;
    margin-bottom:0.5rem;
  }

  .col{
    padding-bottom: 0.5rem;
    overflow:visible;
    white-space: normal;
  }

  .col:nth-of-type(1){
    width:40%;
  }

  .col:nth-of-type(2){
    width:35%;
  }

  .col:nth-of-type(3){
    /* display:none; */
  }
}
</style>
