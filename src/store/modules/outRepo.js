import  * as req from '../../api/outRepo.js';
import  * as types from '../mutation-types.js';

const state = {
    error: null
};

const getters = {
};

const actions = {

    filterOutRepos({commit}, argv) {

        return new Promise((resolve, reject) => {

            req.getOutRepos(argv)
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    commit(types.OUTREPO_LIST, {error});
                });

        });
    }

};

const mutations = {

    [types.OUTREPO_LIST](state,{ products, error }){
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