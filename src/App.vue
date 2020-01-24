<template>
  <div id="app">
    <p v-if="!loaded" class='loading'>Loading library</p>
    <div class='container'>

      <BookPicker
        id='bookpicker'
        v-if="loaded"
      />
      <Books
        :filter='filter'
      />

      <footer v-if="loaded">
        The Cybernetics Library 2020 <a href='https://github.com/cybernetics-library/bookmark-generator/'>(View Source →)</a>
      </footer>
    </div>

  </div>
</template>

<script>

import BookPicker from './components/Bookpicker.vue'
import Books from './components/Books.vue'

export default {
  name: 'app',
  components: {
    BookPicker,
    Books
  },
  data(){
    return{
      loaded: false,
      printGroups: null,
      selectedCollection: null,
      selectedBook: null,
      filter:null
    }
  },
  metaInfo: {
    title: 'Cybernetics Library Bookmark Generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  methods:{
    print(){
      window.print();
    },
    sortCollections(){

      const printGroups = {}

      this.$store.getters.getBooks.forEach(function(book){
        if (book.Print_group){
          Object.entries(book.Print_group).forEach(function([collectionKey, collectionName]){
            if (!printGroups[collectionKey]){
              printGroups[collectionKey] = {
                key : +collectionKey,
                name : collectionName,
                books : []
              }
            }
            printGroups[collectionKey].books.push(+book.Book_ID);
          })
        }
      })
      const payload = {
        p: printGroups
      }
      this.$store.dispatch('setGroups', payload);
    },

    transformData(data){
      var keys = data.shift(),
      i = 0, k = 0,
      obj = null,
      output = [];

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

          obj.Cylib_URL = 'https://localhost:8000/' + obj.Book_ID;

          const a = obj.Primary_Author.split(', ');

          if (a[1]) {
            obj.Author = a[1] + ' ' + a[0];
          } else {
            obj.Author = a[0];
          }

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
          console.log(response)
          const b = this.transformData(response.result.values);
          this.$store.dispatch('setBooks', b);
          this.sortCollections();
          this.loaded = true;
        })
      }).catch(e => console.log(e));

    },
    selectCollection(el){
      this.selectedBook = null;
      this.selectedCollection = el;

    },
    updateFilter(el){
      this.filter = el;
    },
    clearFilter(){
      this.filter = null;
    }
  },
  mounted(){
    this.gapiCall();
  }
}
</script>

<style>
@import url("./assets/css/reset.css");
@import url("./assets/css/fonts.css");

body{
  background-color: black;

}

html{
  font-family: 'Times New Roman', Times, Serif;
  font-size: 14pt;

  -webkit-font-smoothing:antialiased;
}



a{
  color:inherit;
  text-decoration: none;
}
a:visited{
  color:inherit;
}

a:hover{
  text-decoration: underline;
}

@page {
  /* size: A4 landscape; */
  margin: 0;
  padding:0;
}
@media print {
  html, body {
    width: 297mm;
    height: 210mm;
    background-color: white;
  }

}

.container{
  /* display: flex; */
}

.loading{
  color:white;
  /* font-size: 200%; */
  /* text-align: center; */
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

footer{
  padding: 5mm;
  color:white;
}

@keyframes ellipsis {
  to {
    width: 1.25em;
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}


</style>
