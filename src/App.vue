<template>
  <div id="app">
    <p v-if="!loaded" class='loading -cyber'>Loading library</p>

    <router-view v-if="loaded"></router-view>

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
      const payload = {
        p: printGroups
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

          // const a = obj.Primary_Author.split(', ');
          //
          // if (a[1]) {
          //   obj.Author = a[1] + ' ' + a[0];
          // } else {
          //   obj.Author = a[0];
          // }

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

.loading{
  color:white;
  font-size: 20pt;
  margin: 5mm;
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

.app-footer{
  font-size: 14pt;
  padding: 5mm;
  color:white;
}


</style>
