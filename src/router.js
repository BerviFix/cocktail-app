import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./components/Home";
import Cocktail from "./components/Cocktail";

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        component: Home 
    },
    { 
        path: '/cocktail/:id',
        name: 'cocktail',
        component: Cocktail 
    },
]

export const router = new VueRouter({
    routes
})