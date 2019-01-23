<template>
  <div class="filter">
    <div class="mobile-nav" :class="{ active: showMobileNav }" @click="toggleNav">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div v-show="showMobileNav" class="filters-wrap">
      <header>
        <h2>Filters</h2>
      </header>
      <div class="rating">
        <h4>Rating</h4>
        <span class="min">0</span>
        <span class="max">10</span>
        <input
          type="range"
          min="0"
          max="10"
          v-model="rating"
          step="0.5"
          @change="filterMovies"
        />
        <p class="selected">Rating: {{rating}}<span v-if="rating < 10"> - 10</span></p>
      </div>
      
      <div class="genre">
        <h4>Genre</h4>
        <div v-for="(genre, key) in genreList" :key="genre" class="input-control">
          <input
            type="checkbox"
            :name="genre"
            :value="key"
            :id="genre"
            @change="filterMovies($event, key)"
          />
          <label :for="genre">{{ genre }}</label>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SidePanel",
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      genreList: "getGenreList"
    })
  },
  data() {
    return {
      filters: new Set(),
      rating: 3,
      showMobileNav: !this.isMobile
    };
  },
  methods: {
    filterMovies(evt, key) {
      if (key) {
        const keySplit = parseInt(key.split("_")[1]);
        if (evt.target.checked) {
          this.filters.add(keySplit);
        } else {
          this.filters.delete(keySplit);
        }
      }
      this.$store.dispatch("filterMovies", {
        rating: this.rating,
        genres: this.filters
      });
    },
    toggleNav() {
      this.showMobileNav = !this.showMobileNav;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  width: 280px;
  float: left;
  background: #fff;
  margin: 10px;
  .mobile-nav {
    display: none;
    position: fixed;
    z-index: 2;
    right: 15px;
    top: 15px;
    width: 30px;
    span {
      width: 100%;
      height: 5px;
      margin: 2px 0;
      float: left;
      background: #01d377;
      transition: all ease-out 300ms;
    }
    &.active {
      span {
        background: #005731;
      }
    }
  }
  header {
    float: left;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    h2 {
      margin: 0;
      font-size: 1.2rem;
    }
  }
  h4 {
    margin: 0 0 10px 0;
    padding: 0 0 5px 0;
    border-bottom: 1px solid #ccc;
  }
  .rating {
    float: left;
    width: 100%;
    position: relative;
    padding: 10px;
    input {
      width: 100%;
    }
    span,
    p {
      font-weight: 600;
      font-size: 0.9rem;
    }
    .min {
      float: left;
    }
    .max {
      float: right;
    }
  }
  .genre {
    margin-top: 10px;
    padding: 10px;
    float: left;
    width: 100%;
  }
  .input-control {
    float: left;
    padding: 3px 5px;
    width: 100%;
    input {
      float: left;
      margin-top: 5px;
      margin-right: 5px;
    }
    label {
      float: left;
      font-size: 0.9rem;
    }
  }
}
@media screen and (max-width: 600px) {
  .filter {
    flex-direction: row;
    margin: 0;
    width: 100%;
    .mobile-nav {
      display: block;
    }
  }
}
</style>

