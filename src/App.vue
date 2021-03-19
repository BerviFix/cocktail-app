<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <Header />
    
    <main>
      <router-view></router-view>
    </main>
    
    <footer>
    </footer>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    Header
  },

}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  
</style>
