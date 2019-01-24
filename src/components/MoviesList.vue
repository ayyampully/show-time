<template>
  <div class="movies">
    <h2>Now Running ({{movies.length}})</h2>
    <div class="movies-list">
      <Movie
        v-for="(movie, i) in movies"
        :key="i"
        v-bind="{ movie, baseUrl, genreList }"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Movie from "./Movie.vue";

export default {
  name: "Movies",
  components: {
    Movie
  },
  async beforeMount() {
    await this.$store.dispatch("getMovies");
    await this.$store.dispatch("getGenreList");
    await this.$store.dispatch("getImageConfig");
  },
  computed: {
    ...mapGetters({
      movies: "getMovies",
      baseUrl: "getImageUrl",
      genreList: "getGenreList"
    })
  }
};
</script>

<style lang="scss" scoped>
.movies {
  display: flex;
  flex-direction: column;
  h2 {
    color: #fff;
    margin: 5px 0 10px 10px;
  }
}
.movies-list {
  display: flex;
  flex-wrap: wrap;
  flex-basis: content;
}
@media screen and (max-width: 600px) {
  .movies {
    float: left;
    width: 100%;
    h2 {
      font-size: 1rem;
      text-align: center;
    }
  }
  .movies-list {
    justify-content: center;
  }
}
</style>

