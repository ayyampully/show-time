<template>
  <div v-if="movie" class="movie">
    <span :class="ratingCode" class="rating">{{movie.vote_average}}</span>
    <img :src="baseUrl + movie.poster_path" :alt="movie.original_title"/>
    <div class="desc">
      <h4 :title="movie.title">{{movie.title}}</h4>
      <div class="genres">
        <span v-for="genre in genres" :key="genre" >{{ genre }}</span>
      </div>
    </div>
  </div>
</template>

<script>
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
      default: () => {
        return {
          name: ""
        };
      }
    }
  },
  computed: {
    /**
     * return a css class name based on vote_average
     * @returns a string
     */
    ratingCode() {
      let color = "";
      if (this.movie.vote_average >= 7.5) {
        color = "green";
      } else if (this.movie.vote_average >= 5) {
        color = "yellow";
      }
      return color;
    },
    /**
     * Returns an object containing name and count of each genre id
     * @returns an object
     */
    genres() {
      let genres = [];
      this.movie.genre_ids.forEach(id => {
        const genreObj = this.genreList[`id_${id}`];
        if (genreObj) {
          genres.push(genreObj.name);
        }
      });
      return genres;
    }
  }
};
</script>

<style lang="scss" scoped>
.movie {
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 5px solid #fff;
  background: #fff;
  width: calc(20% - 20px);
  position: relative;
  img {
    width: 100%;
  }
  .rating {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    font-weight: 600;
    font-size: 0.9rem;
    background: #989898;
    text-align: center;
    line-height: 1.8rem;
    &.green {
      background: #10c343;
    }
    &.yellow {
      background: #fde40a;
      text-shadow: 0 0 2px rgba(255, 255, 255, 0.6);
      color: #222;
    }
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
@media screen and (min-width: 1024px) and (max-width: 1300px) {
  .movie {
    width: calc(25% - 20px);
  }
}
@media screen and (min-width: 800px) and (max-width: 1024px) {
  .movie {
    width: calc(33.3% - 20px);
  }
}
@media screen and (min-width: 600px) and (max-width: 800px) {
  .movie {
    width: calc(50% - 20px);
  }
}
@media screen and (max-width: 600px) {
  .movie {
    width: calc(100% - 20px);
    padding: 10px;
    .rating {
      top: 15px;
      right: 15px;
    }
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

