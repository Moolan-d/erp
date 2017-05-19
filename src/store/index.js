import Vue from 'vue';
import Vuex from 'vuex';
import repo from './modules/repo'
import user from './modules/user'
import brand from './modules/brand'
import sku from './modules/sku'
import category from './modules/category';
import skus from './modules/sku';
import product from './modules/product'
import booking from './modules/booking'
import intoRepo from './modules/intoRepo'
import outRepo from './modules/outRepo'

Vue.use(Vuex);

const state = {
    error: null
};


const mutations = {

};



const getters = {
    error: state => state.error
}


export default new Vuex.Store({
    state,
    getters,
    mutations,
    modules: {
        repo,
        user,
        brand,
        category,
        sku,
        product,
        booking,
        intoRepo,
        outRepo
    }

});