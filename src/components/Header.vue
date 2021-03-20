<template>
    <header>
      <nav>
          <router-link to="/">
            <img class="logo" src="https://cdn2.iconfinder.com/data/icons/party-new-years/128/Party_Newyears_Cocktail-512.png" alt="" @click="clickLogo()">
          </router-link>
          <router-link to="/"><h1 @click="clickLogo()">Cocktail Time</h1></router-link>
      </nav>
    </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
       clickLogo: function () {
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
    width: 50px;
    height: 50px;
    cursor: pointer;
}
nav h1 {
    cursor: pointer;
}
</style>