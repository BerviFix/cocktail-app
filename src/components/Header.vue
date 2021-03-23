<template>
    <header>
      <nav>
          <router-link to="/">
            <div class="logo">🍹</div>
          </router-link>
          <router-link to="/"><h1 @click="returnHome()">Cocktail Time</h1></router-link>
      </nav>
    </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
       returnHome: function () {
            var self = this;
            self.cocktailSearch = [];
            self.cocktailSearched = "";
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    nav {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 80px;
    background-color: white;
}
nav a {
    text-decoration: none;
    color: inherit;
}
.logo {
    font-size: 20px;
    cursor: pointer;
}
nav h1 {
    margin-left: 5px;
    cursor: pointer;
}
</style>