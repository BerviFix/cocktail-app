<template>
    <div class="wrapper">
        <!-- sezione input ricerca -->
        <div class="search_box_container">
            <div class="search_box">
                <input class="search_input" type="text" name="searchCocktail" placeholder="Search cocktail" v-model="cocktailSearched" v-on:keyup.13="searchCocktail()">
                <i class="fas fa-times delete" @click="clickLogo()"></i>
                <button class="search_button" href="#" @click="searchCocktail()">
                    <i class="material-icons">
                        search
                    </i>
                </button>
            </div>
        </div>
        <!-- sezione input ricerca -->

        <!-- sezione statistiche home -->
        <div class="statistics_wrapper" v-if="cocktailSearch.length ==0">
            <ul class="statistics">
                <li v-for="(report, index) in statistics" :key="index">
                    <span>{{ report.icon }}</span>
                    <h2>{{ report.text }}: </h2>
                    <span>{{ report.info }}</span>
                </li>
            </ul>       
        </div>
        <!-- /sezione statistiche home -->
        
        <!-- statistiche di ricerca -->
        <div class="search_statistics" v-if="cocktailSearch.length !=0">
            <h2>🍹 Total Drinks: {{ cocktailSearch[0].length }}</h2>
        </div>
        <!-- /statistiche di ricerca -->

        <!-- sezione card cocktail -->
        <div class="card_container" v-if="cocktailSearch.length == 0">
            <div class="card_cocktail animate__animated animate__fadeInLeft" v-for="cocktail in cocktailHome[0].slice(0,cocktailHomeSlice)" :key="cocktail.idDrink">
                <router-link :to="{ name: 'cocktail', params: {id: cocktail.idDrink }  }">
                    <img :src="cocktail.strDrinkThumb" alt="cocktail-img" width="100%" height="300px">
                    <div class="cocktail_name">
                        <h2>{{cocktail.strDrink}}</h2>
                    </div>
                </router-link>
            </div>
        </div>
        <!-- /sezione card cocktail -->

        <!-- sezione ricerca cocktail -->
        <section class="card_container" v-if="cocktailSearch.length !=0">
            <div class="card_cocktail animate__animated animate__fadeInRight" v-for="cocktail in cocktailSearch[0]" :key="cocktail.idDrink">
                <router-link :to="{ name: 'cocktail', params: {id: cocktail.idDrink }  }">
                    <img :src="cocktail.strDrinkThumb" alt="cocktail-img" width="100%" height="300px">
                    <div class="cocktail_name">
                        <h2>{{cocktail.strDrink}}</h2>
                    </div>
                </router-link>
            </div>
        </section>
        <!-- /sezione ricerca cocktail -->
        
        <!-- bottone load more -->
        <div class="button_more" v-if="cocktailSearch.length == 0">
            <button @click="loadMore()">
                <h4>Load more</h4>
                <i class="fas fa-plus"></i>
            </button>
        </div>
        <!-- bottone load more -->

    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data () {
      return {
            cocktailSearched: "",
            statistics: [
                {   
                    icon: '🍹',
                    text: 'Total Drinks',
                    info: '612',
                },
                {   
                    icon: '🍋',
                    text: 'Total Ingredients',
                    info: '484',
                },
                {
                    icon: '🍸',
                    text: 'Drink Images',
                    info: '611(87cc)',
                },
            ],
            cocktailHome: [],
            cocktailSearch: [],
            cocktailHomeSlice: 12,
        }
    },
    methods: {
        searchCocktail: function () {
            // questa funzione la uso per effetturare la ricerca del drink, recupero il paremetro inserito nel box di ricerca dall'utente e lo uso per completare l'indirizzo della chiamata GET all'API, una volta che ricerco la risposta dalla chiamata AJAX mi salvo tutto in un array "cocktailSearch".
            var self = this;
            self.cocktailSearch = [];
            if (self.cocktailSearched != "") {
                axios
                    .get('https://www.thecocktaildb.com/api/json/v1/1/search.php', {
                        params: {
                            s: self.cocktailSearched,
                        }
                    })
                    .then((result) => {
                        self.cocktailSearch.push(result.data.drinks);
                    });
            }
            console.log(self.cocktailSearch);
        },
        clickLogo: function () {
            // questa funzione la uso per svuotare il campo di ricerca e l'array di ricerca così da tornare a visualizzare la home.
            var self = this;
            self.cocktailSearch = [];
            self.cocktailSearched = "";
        },
        loadMore: function () {
            // questa funzione la uso per andare a recuperare più drink dall'array che visualizzione nella home.
            var self = this;
            self.cocktailHomeSlice += 12;
        },
    },
    created: function () {
        //ho aggiunto una funzione nel created che mi richiama all'endpoint relativo un numero di cocktail così da avere una homepage dinamica
        var self = this;
            axios
                .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s')
                .then((result) => {
                    self.cocktailHome.push(result.data.drinks);
                });
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* stile search box */
    .search_box_container {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 60px;
      margin-top: 5%;
    }
  .search_box {
      display: flex;
      align-items: center;
      width: 300px;
      height: 100%;
      background: #2f3640;
      border-radius: 40px;
      padding: 10px;
    }
  .delete {
      color: tomato;
      font-size: 16px;
      margin-right: 10px;
      cursor: pointer;
    }
  .search_input {
      width: 235px;
      background: none;
      color: white;
      border:none;
      outline: none;
      padding: 0 6px;
      font-size: 16px;
      line-height: 40px;
    }
  .search_button {
      color:  #2f3640;
      float: right;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background:  white;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.4s;
      outline:none;
    }
    /* /stile search box */

    /* stile sezione statistiche */
    .statistics_wrapper {
    width: 70%;
    margin: auto;
    margin-top: 3%;
    }
    .statistics {
        display: flex;
        justify-content: center;
        list-style: none;
    }
    .statistics li {
        display: flex;
        align-items: center;
        padding: 0 13px;
        max-width: 350px;
        border-left: 2px solid black;
    }
    .statistics li:first-child {
        border:none;
    }
    .statistics li h2 {
        padding: 0 10px;
    }
    .statistics span {
        font-size: 20px;
    }
    .search_statistics {
        display: flex;
        justify-content: center;
        width: 70%;
        margin: auto;
        margin-top: 3%;
    }
    /* stile sezione statistiche */

    /* stile card cocktail */
    .card_container {
        width: 65%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 2%;
    }
    .card_cocktail {
        max-width: calc(100% / 4 - 20px);
        height: 360px;
        margin: 20px 10px;
        border-top-left-radius: 25px;
        border-bottom-right-radius: 25px;
        box-shadow: 4px 4px 15px 1px rgba(0, 0, 0, 0.5);
        overflow: hidden;
        cursor: pointer;
    }
    .card_cocktail a {
        text-decoration: none;
        color: inherit;
    }
    .cocktail_name {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* /stile card cocktail */

    /* stile bottone load more */
    .button_more {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60px;
        margin: 3% 0;    }
    .button_more button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 195px;
        height: 45px;
        background-color: black;
        color: white;
        border: none;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        border-radius: 6px;
    }
    .button_more i {
        margin-left: 5%;
    }
    /* /stile bottone load more */
    /* /stile del main con sezione stistiche e card drink */

    /* media query per la gestione del responsive */
    @media screen and (max-width: 1400px) {
        .search_box_container {
            margin-top: 8%;
        }
        .card_cocktail {
            max-width: calc(100% / 3 - 20px);
        
        }
    }

    @media screen and (max-width: 1000px) {
        .search_box_container {
            margin-top: 10%;
        }
        .card_cocktail {
            max-width: calc(100% / 2 - 20px);
        }
    }

    @media screen and (max-width: 700px) {
        .card_cocktail {
            max-width: calc(100% / 1 - 20px);
        }
    }
    /* /media query per la gestione del responsive */
</style>
