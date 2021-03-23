<template>
    <div >
        <footer>
            <p v-for="(content,index) in footer" :key="index">
                {{ content.text }}
            </p>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
        return {
            footer: [
                {   
                    text: '@ 2020 CocktailTime',
                },
                {   
                    text: 'Powered by www.thecocktaildb.com',
                },
            ],
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    footer {
        width: 65%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
    }
</style>