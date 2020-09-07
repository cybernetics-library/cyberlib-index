<template>
  <div id="app">
    <div v-if="!loaded" class='loading-screen'>
      <div class='loading-inner'>
        <h1 class='-cyber animate'>
          <span>C</span>
          <span>Y</span>
          <span>B</span>
          <span>E</span>
          <span>R</span>
          <span>N</span>
          <span>E</span>
          <span>T</span>
          <span>I</span>
          <span>C</span>
          <span>S </span>
          <span>L</span>
          <span>I</span>
          <span>B</span>
          <span>R</span>
          <span>A</span>
          <span>R</span>
          <span>Y</span>
        </h1>
        <!-- <p v-if="!loaded" class='loading -mono'>Loading library</p> -->
      </div>
    </div>

    <transition name="fade">
    <router-view v-if="loaded"></router-view>
    </transition>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  },
  data(){
    return{
      loaded: false,
      meta:null
    }
  },
  metaInfo: {
    title: 'Cybernetics Library Index',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  methods:{

    sortGroups(){

      const printGroups = {}
      this.$store.getters.getBooks.forEach(function(book){
        if (book.Print_group){
          book.Print_group.forEach(function(i){

            if (!printGroups[i]){

              printGroups[i] = {
                name : i,
                books : []
              }
            }
            printGroups[i].books.push(+book.Book_ID);
          })
        }
      })

      const tagGroupsMap = {}
      this.$store.getters.getBooks.forEach(function(book){
        if (book.Tags){
          book.Tags.forEach(function(i){

            if (!tagGroupsMap[i]){

              tagGroupsMap[i] = {
                name : i,
                books : []
              }
            }
            tagGroupsMap[i].books.push(+book.Book_ID);
          })
        }
      })

      const tagGroupsArray = Object.values(tagGroupsMap).sort(function(a, b){


        if(a.books.length > b.books.length) return -1;
        if(a.books.length < b.books.length) return 1;
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;


      });



      // console.log(Object.keys(tagGroupsMap).length);

      // console.log({tagGroupsMap});

      const payload = {
        p: printGroups,
        t: tagGroupsArray
      }
      // console.log(payload)
      this.$store.dispatch('setGroups', payload);
    },

    transformData(data){
      var keys = data.shift(),
      i = 0, k = 0,
      obj = null,
      output = [];

      keys.forEach((key, i) => {
        keys[i] = keys[i].split(' ').join('_')
      });

      for (i = 0; i < data.length; i++) {
          obj = {};

          for (k = 0; k < keys.length; k++) {
              obj[keys[k]] = data[i][k];

          }

          obj.Book_ID = +obj.Book_ID;

          if(obj.ISBNs){obj.ISBNs = obj.ISBNs.slice(1,-1).split(', ');}
          if(obj.ISBN){obj.ISBN = obj.ISBN.slice(1,-1);}
          if(obj.Tags){obj.Tags = obj.Tags.split(', ');}
          if(obj.Subjects){obj.Subjects = obj.Subjects.split('|');}
          if(obj.Print_group){obj.Print_group = obj.Print_group.split(', ');}

          obj.Cylib_URL = 'https://library.trust.support/' + obj.Book_ID;
          // obj.Cylib_URL = 'https://localhost:8000/catalog/' + obj.Book_ID;

          obj.Author = obj.Primary_Author;

          output.push(obj);
      }

      return output
    },

    gapiCall(){
      // console.log(this.$gapi)
      this.$gapi.isSignedIn()
      .then(result => {
        console.log(result ? 'Signed in' : 'Signed out')
      })

      this.$gapi._libraryInit('client', { discoveryDocs: [ 'https://sheets.googleapis.com/$discovery/rest?version=v4' ]})
      .then(client => {
        return gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: this.$gapi.config.sheetId,
          range: 'Books',
        }).then(response => {
          // console.log(response)
          const b = this.transformData(response.result.values);
          this.$store.dispatch('setBooks', b);
          this.sortGroups();
          this.meta = response.headers;
          this.loaded = true;
        })
      }).catch(e => console.log(e));

    },

  },
  mounted(){
    this.gapiCall();
    this.$store.dispatch('setDate');
  }
}
</script>

<style>
@import url("./assets/css/reset.css");
@import url("./assets/css/fonts.css");
@import url("./assets/css/main.css");
@import url("./assets/css/animation.css");

.loading{
  color:white;
  font-size: 10pt;
  /* margin: 5mm; */
  width: 100%;
  text-align: center;
}
.loading:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4,end) 900ms infinite;
  animation: ellipsis steps(4,end) 900ms infinite;
  content: "\2026"; /* ascii code for the ellipsis character */
  width: 0px;
}

.loading-screen{
  height: 100vh;
  width: 100%;
  display: flex;  
  flex-direction: column;
  justify-content: space-around;
}


h1 span {
    opacity: 0.5;
    animation: introanim 1s forwards;
    animation-iteration-count:infinite;
}

h1{
  color:white;
  font-size: 2rem;
  width: 100%;
  text-align: center;
}

.app-footer{
  font-size: 14pt;
  padding: 5mm;
  color:white;
}


</style>
