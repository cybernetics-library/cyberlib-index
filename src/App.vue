<template>
  <div id="app">

    <p v-if="!loaded">Loading ...</p>

    <Collections
    v-if="loaded"
    :collections="collections"
    />

    <Books
    v-if="selectedCollection"
    :collection="selectedCollection"
    />


  </div>
</template>

<script>
import Collections from './components/Collections.vue'
import Books from './components/Books.vue'

export default {
  name: 'app',
  components: {
    Collections,
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
  methods:{

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

</style>
