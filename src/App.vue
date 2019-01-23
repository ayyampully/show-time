<template>
  <div id="app" class="container">
    <header class="header">
      <h1>ShowTime <sup>beta</sup></h1>
    </header>
    <section class="content">
      <SidePanel v-bind="{ isMobile }" />
      <Movies v-bind="{ isMobile }" />
    </section>
    
  </div>
</template>

<script>
import SidePanel from "./components/SidePanel.vue";
import Movies from "./components/Movies.vue";

export default {
  name: "app",
  components: {
    SidePanel,
    Movies
  },
  beforeMount() {
    if (window.innerWidth <= 600) {
      this.isMobile = true;
    }
  }
};
</script>

<style <style lang="scss">
body {
  background: #091c24;
}
div,
header,
footer,
section {
  box-sizing: border-box;
}
.container {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.header {
  float: left;
  width: 100%;
  padding: 10px;
  background: #091c24;
  z-index: 1;
  top: 0;
  h1 {
    color: #01d377;
    font-weight: 200;
    margin: 0;
    sup {
      font-size: 1rem;
    }
  }
}
@media screen and (max-width: 600px) {
  .container {
    flex-direction: row;
    .header {
      position: fixed;
      padding: 5px 0 10px;
    }
    .content {
      margin-top: 60px;
    }
  }
}
</style>
