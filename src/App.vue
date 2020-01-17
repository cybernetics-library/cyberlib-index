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

      <div>
        <p  @click="print()">Print</p>
      </div>
    </nav>
    <Books
    v-if="selectedCollection"
    :collection="selectedCollection"
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
      selectedCollection: null
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

    getContent(){
      //login and go here http://www.librarything.com/api/json.php to see Key + ID
      this.$api.get('?userid=' + process.env.VUE_APP_USERID + '&key=' + process.env.VUE_APP_KEY +
      '&max=100' + '&showCollections=1' + '&showTags=1' + '&responseType=json' )
      .then((response) => {
        // console.log(response.data);

        var b = [];

        b = Object.entries(response.data.books).map(([
          book_id, bookData
        ]) => {
          return {
            book_id,
            title : bookData.title,
            author_lf : bookData.author_lf,
            author : bookData.author_fl,
            isbn  : bookData.ISBN,
            tags : bookData.tags,
            collections : bookData.collections,
            cover : bookData.cover,
            publication_date : bookData.publicationdate,
            cyliburl : 'https://library.cybernetics.social/checkout/' + book_id
          }
        });

        // console.log(b);

        this.$store.dispatch('setBooks', b);

        this.sortCollections();

        this.loaded = true;
      })
      .catch(e => console.log(e));
    },
    selectCollection(el){
      this.booksLoaded = true;

      this.selectedCollection = el;
    }
  },
  mounted(){
    this.getContent();
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
