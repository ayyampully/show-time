<template>
  <div class="movie">
    <img :src="baseUrl + movie.poster_path" :alt="movie.original_title"/>
    <div class="desc">
      <h4 :title="movie.title">{{movie.title}}</h4>
      <div class="genres">
        <span v-for="id in movie.genre_ids" :key="id" >{{ genreList[`id_${id}`] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Movie",
  props: {
    movie: {
      type: Object,
      default: null
    },
    baseUrl: {
      type: String,
      default: ""
    },
    genreList: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.movie {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 5px solid #fff;
  background: #fff;
  min-width: 190px;
  max-width: 260px;
  img {
    width: 100%;
  }
  .desc {
    flex: 1;
    text-align: center;
    color: #091c24;
    h4 {
      margin: 5px 0;
      font-size: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      margin: 5px 0;
      font-size: 0.8rem;
    }
    .genres {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      span {
        font-size: 0.8rem;
        margin: 3px;
        padding: 0 3px;
        background: #d9d9d9;
        border-radius: 3px;
        overflow: hidden;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .movie {
    max-width: 340px;
    padding: 10px;
    .desc {
      h4 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
    }
  }
}
</style>

