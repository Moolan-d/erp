import request from '../../api/brand.js';
import * as types from '../mutation-types.js';

const state = {
    brands: [],
    error:null
};

const getters = {
    brands: state => state.brands

};

const actions = {
    createbrand({ commit },{ newbrand }) {

        return new Promise((resolve, reject) => {

            request.createBrand(newbrand)
                .then(res => {
                    resolve(res)
                    commit(types.BRAND_CREATE, {
                        newbrand
                    })

                })
                .catch(error => {
                    reject(error)
                    commit(types.BRAND_CREATE, {
                        error
                    })
                })


        })

    },
    getBrands({ commit }) {
        return new Promise((resolve, reject) => {
            request.getBrands()
                .then(res => {
                    resolve(res)
                    commit(types.BRANDS_LIST, {
                        res
                    })
                }).catch(error => {
                    commit(types.BRANDS_LIST, {
                        error
                    })
                })
        })

    },

    updateBrand({ commit },{ updateForm }) {
        return new Promise((resolve, reject) => {
            request.update(updateForm)
                .then(res => {
                    resolve(res)
                    commit((types.BRAND_UPDATE), {
                        res
                    })
                })
        }).catch(error => {
            commit(types.BRAND_UPDATE, {
                error
            })
        })

       
    }
};

const mutations = {

    [types.BRAND_CREATE](state,{ newbrand, error }){
        if (error) {
            state.error = error;
            return;
        }
        // this.state.brands.push(newbrand);
    },
    [types.BRANDS_LIST](state,{ res, error }){
        if (error) {
            state.error = error;
            return;
        }
        state.brands = res;
    },
    [types.BRAND_UPDATE](state,{ res, error }){
        if (error) {
            state.error = error;
            return;
        }
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};