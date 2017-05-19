import request from '../../api/category.js';
import * as types from '../mutation-types.js';

const state = {
    categories: [],
    error:null
};

const getters = {
    categories: state => state.categories

};

const actions = {

    createCategory({ commit },{ categoryForm }) {
        return new Promise((resolve, reject) => {

            request.createCat(categoryForm)
                .then(res => {
                    resolve(res)
                    commit(types.CATEGORY_CREATE, {
                        res
                    })
                }).catch(error => {
                    commit(types.CATEGORY_CREATE, {
                        error
                    })
                })
        })

    },

    getCategories({ commit }) {

        return new Promise((resolve, reject) => {
            request.getCat()
                .then(res => {
                    resolve(res)
                    commit(types.CATEGORIEY_LIST, {
                        res
                    })
                }).catch(error => {
                    commit(types.CATEGORIEY_LIST, {
                        error
                    })
                })

        })

    },

    updateCatetory({ commit },{ updateForm }) {

        return new Promise((resolve, reject) => {
            request.updateCatetory(updateForm)
                .then(res => {
                    resolve(res)
                    commit(types.CATEGORIEY_UPDATE, {
                        res
                    })
                })
                .then(window.location.reload("#/home/center/categories"))
                .catch(error => {
                    commit(types.CATEGORIEY_UPDATE, {
                        error
                    })
                })
        })

    }
};




const mutations = {

    [types.CATEGORY_CREATE](state,{ res, error }) {
        if (error) {
            state.error = error;
            return;
        }
    },
    [types.CATEGORIEY_LIST](state,{ res, error }){
        if (error) {
            state.error = error;
            return;
        }
        state.categories = res;
    },
    [types.CATEGORIEY_UPDATE](state,{ res, error }){
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