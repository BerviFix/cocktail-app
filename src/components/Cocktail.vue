<template>
  <div>
    <div class="cocktail_info" v-for="(cocktail,index) in product" :key="index">
      <img :src="cocktail.strDrinkThumb" alt="cocktail-img" width="500px" height="500px">
      <div class="info_content">
        <h1>{{cocktail.strDrink}}</h1>
        <h2>Instruction:</h2>
        <p>{{cocktail.strInstructions}}</p>
        <h2>Glass:</h2>
        <p>{{cocktail.strGlass}}</p>
      </div>
    </div>

    <div class="cocktail_ingredients" v-for="(ingredient,index) in ingredients" :key="index">
      <div v-if="ingredient != null">
        <img :src="'https://www.thecocktaildb.com/images/ingredients/' + ingredient + '-Medium.png'" alt="cocktail-img" width="500px" height="500px">
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
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + self.$route.params.id)
      .then((result) => {
          self.product = result.data.drinks;

          for (let i = 1; i <= 15; i++) {
            self.ingredientKey.push('strIngredient' + i);
          }

          for (key in self.product[0]) {
            var ingredient = self.ingredientKey.includes(key);
            if (ingredient) {
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
    margin-top: 5%;
  }
</style>
