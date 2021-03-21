<template>
    <div class="wrapper">
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

        <!-- sezione statistiche -->
        <div class="statistics_wrapper" v-if="cocktailSearch.length ==0">
            <ul class="statistics">
                <li v-for="(report, index) in statistics" :key="index">
                    <span>{{ report.icon }}</span>
                    <h2>{{ report.text }}: </h2>
                    <span>{{ report.info }}</span>
                </li>
            </ul>       
        </div>
        
        <!-- statistiche di ricerca -->
        <div class="search_statistics" v-if="cocktailSearch.length !=0">
            <h2>🍹 Total Drinks: {{ cocktailSearch[0].length }}</h2>
        </div>
        <!-- /sezione statistiche -->

        <!-- sezione card cocktail -->
        <div class="card_container" v-if="cocktailSearch.length == 0">
            <div class="card_cocktail" v-for="cocktail in cocktailHome[0].slice(0,cocktailHomeSlice)" :key="cocktail.idDrink">
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
            <div class="card_cocktail" v-for="cocktail in cocktailSearch[0]" :key="cocktail.idDrink">
                <router-link :to="{ name: 'cocktail', params: {id: cocktail.idDrink }  }">
                    <img :src="cocktail.strDrinkThumb" alt="cocktail-img" width="100%" height="300px">
                    <div class="cocktail_name">
                        <h2>{{cocktail.strDrink}}</h2>
                    </div>
                </router-link>
            </div>
        </section>
        <!-- /sezione ricerca cocktail -->

        <div class="button_more" v-if="cocktailSearch.length == 0">
            <button @click="loadMore()">
                <h4>Load more</h4>
                <i class="fas fa-plus"></i>
            </button>
        </div>
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
            var self = this;
            self.cocktailSearch = [];
            self.cocktailSearched = "";
        },
        loadMore: function () {
            var self = this;
            self.cocktailHomeSlice += 12;
        },
    },
    created: function () {
        //ho aggiunto una funzione nel created che mi richiama all'endpoint relativo un nmero di cocktail così avrò una homepage dinamica
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
        transition: 1s;
    }
    .card_cocktail:hover {
        transform: scale(1.025);
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
    /* /stile del main con sezione stistiche e card drink */

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
</style>
