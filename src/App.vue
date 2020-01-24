<template>
  <div id="app">

    <p v-if="!loaded" class='loading'>Loading library</p>

    <nav v-if="loaded">
      <Collections
      id='collectionpicker'
      v-if="loaded"
      :collections="collections"
      />

      <BookPicker
      id='bookpicker'
      v-if="loaded"
      />

      <div class='printbtn'>
        <p  @click="print()">Print</p>
      </div>
    </nav>
    <Books
    v-if="selectedCollection"
    :collection="selectedCollection"
    :book="selectedBook"

    />

  </div>
</template>

<script>
import Collections from './components/Collections.vue'
import BookPicker from './components/Bookpicker.vue'

import Books from './components/Books.vue'

export default {
  name: 'app',
  components: {
    Collections,
    BookPicker,
    Books
  },
  data(){
    return{
      loaded: false,
      booksLoading: false,
      booksLoaded: false,
      collections: null,
      selectedCollection: null,
      selectedBook: null,
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

      const collections = {}

      for (var i = 0; i < this.$store.getters.getBooks.length; i++) {
        this.$store.getters.getBooks[i]
      }

      this.$store.getters.getBooks.forEach(function(book){
        if (book.collections){
          Object.entries(book.collections).forEach(function([collectionKey, collectionName]){
            // console.log(i);
            if (!collections[collectionKey]){
              collections[collectionKey] = {
                key : +collectionKey,
                name : collectionName,
                books : []
              }
            }

            collections[collectionKey].books.push(+book.book_id);

          })
        }
      })
      // console.log(collections);

      this.collections = Object.values(collections);
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
          // console.log(response.result)


          var keys = response.result.values.shift(),
          i = 0, k = 0,
          obj = null,
          output = [];

          for (i = 0; i < response.result.values.length; i++) {
              obj = {};

              for (k = 0; k < keys.length; k++) {
                  obj[keys[k]] = response.result.values[i][k];
              }

              if(obj.ISBNs){obj.ISBNs = obj.ISBNs.slice(1,-1).split(', ');}
              if(obj.ISBN){obj.ISBN = obj.ISBN.slice(1,-1);}
              if(obj.Tags){obj.Tags = obj.Tags.split(', ');}
              if(obj.Subjects){obj.Subjects = obj.Subjects.split('|');}
              if(obj.Print_group){obj.Print_group = obj.Print_group.split(', ');}

              output.push(obj);
          }

          console.log(output);

          this.$store.dispatch('setBooks', output);

          // this.sortCollections();

          this.loaded = true;
        })
      }).catch(e => console.log(e));

    },
    selectCollection(el){
      this.booksLoaded = true;
      this.selectedBook = null;
      this.selectedCollection = el;

    },
    selectBook(el){
      this.booksLoaded = true;
      this.selectedBook = el;
    }
  },
  mounted(){
    this.gapiCall();
  }
}
</script>

<style>
@import url("./assets/css/reset.css");

body{
  background-color: black;

}

html{
  /* font-family: 'IBM Plex Mono'; */
  /* line-height: 2; */

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
  nav{
    display: none !important;
  }
}

nav{
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding:5mm;
}

.printbtn{
  position: fixed;
  top:0;
  right:0;
  background-color: white;
  padding: 5mm;
  /* mix-blend-mode: difference; */
  z-index: 99;
}

.printbtn:hover{
  color: white;
  background-color: black;
  cursor: pointer;
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
