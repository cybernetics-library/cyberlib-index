<template>
  <div id="app">
    
    <Selection
    v-if="loaded"
    :books="books"
    :collections="collections"
    />
  </div>
</template>

<script>
import Selection from './components/Selection.vue'

export default {
  name: 'app',
  components: {
    Selection
  },
  data(){
    return{
      loaded: false,
      books: null,
      collections: null
    }
  },
  methods:{

    sortCollections(){

      const collections = {}

      for (var i = 0; i < this.books.length; i++) {
        this.books[i]
      }

      this.books.forEach(function(book){
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
      '&max=20' + '&showCollections=1' + '&showTags=1' + '&responseType=json' )
      .then((response) => {
        console.log(response.data);

        this.books = Object.entries(response.data.books).map(([
          book_id, bookData
        ]) => {
          return {
            book_id,
            title : bookData.title,
            author_lf : bookData.author_lf,
            author : bookData.author_fl,
            isbn  : bookData.ISBN,
            tags : bookData.tags,
            collections : bookData.collections

          }
        });

        this.sortCollections();

        this.loaded = true;
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
