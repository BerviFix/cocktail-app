<template>
  <div>
    <!-- sezione informazioni relative al drink selezionato -->
    <div class="cocktail_info" v-for="(cocktail,index) in product" :key="index">
      <img class="cocktail_image" :src="cocktail.strDrinkThumb" alt="cocktail-img" width="700px" height="700px">
      <div class="info_content">
        <h3>Home / {{cocktail.strDrink}}</h3>
        <h1>{{cocktail.strDrink}}</h1>
        <h2>Instruction:</h2>
        <p>{{cocktail.strInstructions}}</p>
        <h2>Glass:</h2>
        <p>Serve: {{cocktail.strGlass}}</p>
      </div>
    </div>
    <!-- /sezione informazioni relative al drink selezionato -->

    <!-- sezione ingredienti relative al drink selezionato -->
    <div class="cocktail_ingredients_wrapper">
      <h2>Ingredients ({{ingredients.length}})</h2>
      <div class="cocktail_ingredients_card_container">
        <div class="cocktail_ingredients_card" v-for="(ingredient,index) in ingredients" :key="index">
          <div class="cocktail_ingredients_card_content" v-if="ingredient != null">
            <img :src="'https://www.thecocktaildb.com/images/ingredients/' + ingredient + '-Medium.png'" alt="cocktail-img" width="200px" height="200px">
            <h3>{{ measures[index] }} {{ ingredient }}</h3>
          </div>
        </div>
      </div>
    </div>
    <!-- /sezione ingredienti relative al drink selezionato -->

    <!-- sezione browse more che mostra ogni volta 4 drink diversi -->
    <div class="browse_more_wrapper">
      <h2>Browse More</h2>
      <div class="browse_more_container">
        <div class="card_cocktail" v-for="cocktail in browseMore" :key="cocktail.idDrink" @click="locationReload()">
          <router-link :to="{ name: 'cocktail', params: {id: cocktail.idDrink }}">
            <img :src="cocktail.strDrinkThumb" alt="cocktail-img" width="100%" height="300px">
            <div class="cocktail_name">
                <h2>{{cocktail.strDrink}}</h2>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- /sezione browse more che mostra ogni volta 4 drink diversi -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Cocktail',
  data () {
    return {
      product: [],
      ingredientKey: [],
      measureKey: [],
      ingredients: [],
      measures: [],
      browseMore: [],
    }
  },
  methods: {
    locationReload: function () {
      location.reload();
    },
  },
  mounted: function () {
    var self = this;
    var key;


    // vado a pushare in due array i nomi delle chiavi riferite agli ingredienti
    for (let i = 1; i <= 15; i++) {
      self.ingredientKey.push('strIngredient' + i);
      self.measureKey.push('strMeasure' + i);
    }

    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + self.$route.params.id)
      .then((result) => {
          self.product = result.data.drinks;

          // vado a ciclare nell'oggetto contentente tutte le informazioni del drink andando a confrontare se le chiavi dell'oggetto hanno una corrispondenza con i nomi delle chiavi degli ingredienti e dele quantità, se trovo una corrispondenza pusho il valore della chiave nei corrispettivi array che mi serviranno per andare a creare le card contenenti gli ingredienti.
          for (key in self.product[0]) {
            var ingredient = self.ingredientKey.includes(key);
            var measure = self.measureKey.includes(key);

            if (ingredient && self.product[0][key] != null) {
              self.ingredients.push(self.product[0][key]);
            }

            if (measure && self.product[0][key] != null) {
              self.measures.push(self.product[0][key]);
            }
          }
      });

    for (let i = 0; i < 4; i++) {
      // questo ciclo for mi aggiunge all'array "browseMore" un drink casuale tramite il suo endpoint relativo.
      axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((result) => {
        self.browseMore.push(result.data.drinks[0]);
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* stile sezione informazioni del drink */
  .cocktail_info {
    display: flex;
    align-items: center;
    width: 65%;
    margin: auto;
    margin-top: 5%;
  }
  .info_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
    height: 700px;
    margin-left: 10%;
  }
  .info_content h1 {
    margin: 8% 0;
    font-size: 50px;
  }
  .info_content h2 {
    margin: 5% 0;
  }
  /* /stile sezione informazioni del drink */

  /* stile sezione ingredienti */
  .cocktail_ingredients_wrapper {
    width: 65%;
    margin: auto;
    margin-top: 5%;
  }
  .cocktail_ingredients_wrapper > h2 {
    width: 60%;
    text-align: center;
  }
  .cocktail_ingredients_card_container {
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    margin-top: 2%;
  }
  .cocktail_ingredients_card {
    width: 350px;
    height: 350px;
    margin: 20px 10px;
    background-color: #F5F5F5;
    overflow: hidden;
    cursor: pointer;
  }
  .cocktail_ingredients_card_content {
    width: 100%;
    height: 100%;
    padding: 10% 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  /* stile sezione ingredienti */

  /* stile sezione browse more */
  .browse_more_wrapper {
    width: 65%;
    margin: auto;
    margin-top: 5%;
  }
  .browse_more_wrapper > h2 {
    text-align: center;
  }
  .browse_more_container {
    display: flex;
    width: 100%;
    margin-top: 2%
  }
  .card_cocktail {
    max-width: calc(100% / 4 - 20px);
    height: 360px;
    margin: 20px 10px;
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
    align-items: center;
  }
  /* /stile sezione browse more */
</style>
