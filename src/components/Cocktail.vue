<template>
  <div>
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

    <h2>Ingredients ({{ingredients.length}})</h2>
    <div class="cocktail_ingredients" v-for="(ingredient,index) in ingredients" :key="index">
      <div v-if="ingredient != null">
        <img :src="'https://www.thecocktaildb.com/images/ingredients/' + ingredient + '-Medium.png'" alt="cocktail-img">
        <h3>{{ingredient}}</h3>
      </div>
    </div>
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
      ingredients: [],
    }
  },
  mounted: function () {
    var self = this;
    var key;

    // mi creo un array contententi i nomi delle chiavi riferite agli ingredienti
    for (let i = 1; i <= 15; i++) {
      self.ingredientKey.push('strIngredient' + i);
    }

    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + self.$route.params.id)
      .then((result) => {
          self.product = result.data.drinks;
          
          // vado a ciclare nell'oggetto contentente tutte le informazioni del drink andando a confrontare se le chiavi dell'oggetto hanno una corrispondenza con i nomi delle chiavi degli ingredienti del drink, se trovo una corrispondenza pusho il valore della chiave in un array 'ingredients' che mi servirà per andare a creare le card contenenti gli ingredienti.
          for (key in self.product[0]) {
            var ingredient = self.ingredientKey.includes(key);
            if (ingredient && self.product[0][key] != null) {
              self.ingredients.push(self.product[0][key]);
            }
          }
      });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cocktail_info {
    display: flex;
    align-items: center;
    width: 65%;
    margin: auto;
    margin-top: 5%;
  }
  .cocktail_image {
    border-radius: 15px;
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
</style>
