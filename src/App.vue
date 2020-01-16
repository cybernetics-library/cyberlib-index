<template>
  <div id="app">

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  methods:{
    getContent(){
      this.$api.get('?userid=' + process.env.USERID + '&key=' + process.env.KEY )
      .then((response) => {
        console.log(response.data);
      })
      .catch(e => console.log(e));
    }
  },
  mounted(){
    this.getContent();
  }
}
</script>

<style>


</style>
