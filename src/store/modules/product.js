import  * as req from '../../api/product';

import * as types from '../mutation-types.js';

const state = {
    products: [],
    error: null
};

const getters = {
    products: state => state.products,
};

const actions = {
    createProduct({ commit },{ productForm }) {

        return new Promise((resolve, reject) => {
            req.createProduct2(productForm)
                .then(res => {
                    resolve(res)
                    commit(types.PRODUCT_CREATE, {
                        res
                    })
                })
                .catch(error => {

                    commit(types.PRODUCT_CREATE, {
                        error
                    })
                })
        })
    },
       
    getProducts({ commit }) {
        return new Promise((resolve) => {
            req.getProducts({}).then(res => {
                commit(types.PRODUCT_LIST, {
                    products: res.products
                });
            }).catch(error => {
                commit(types.PRODUCT_LIST, {
                    error
                })
            });
        })
    },
    updateProduct({ commit },{ updateForm }) {
        return new Promise((resolve, reject) => {
            req.updateProduct({
                name: updateForm.prdname,
                id: updateForm.prdId,
                brand: updateForm.brd,
                category: updateForm.cat
            }, )

        })
    }
};

const mutations = {

    [types.PRODUCT_CREATE](state,{ res, error }) {
        if (error) {

            state.error = error;
            return;
        }
       // state.products.push(res);
    },

    [types.PRODUCT_LIST](state,{ products, error }) {
        if (error) {
            state.error = error;
            return;
        }
        state.products = products;
    },
    [types.PRODUCT_UPDATE](state,{ res, error }) {
        if (error) {
            console.log(error)
            state.error = error;
            return;
        }
       // state.products.push(res);
    }
   
};


export default {
    state,
    getters,
    actions,
    mutations
};