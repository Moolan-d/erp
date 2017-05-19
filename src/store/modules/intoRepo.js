import  * as req from '../../api/intoRepo.js';
import  * as types from '../mutation-types.js';

const state = {
    intoRepos:[],
    error: null
};

const getters = {

};

const actions = {

    filterIntoRepos({ commit }, argv) {
        return req.getIntoRepos(argv);
    },


    createIntoRepo({ commit },{ formData }) {
        return new Promise((resolve, reject) => {
            let fields = "id"
            req.createIntoRepo(formData, fields)
                .then(res => {
                    resolve(res.intoRepo);
                    commit(types.INTOREPO_CREATE, {
                        intoRepo: res.intoRepo
                    })
                }).catch(error => {
                    commit(types.INTOREPO_CREATE, {
                        error
                    })
                });

        });
    },
    
    updateIntoRepo({ commit },{ data, fields }) {
        return new Promise((resolve, reject) => {
            req.updateIntoRepo({
                    data,
                    fields
                })
                .then(res => {
                    reslove(res)
                }).catch(error => {
                    commit(types.INTOREPO_UPDATE, {
                        error
                    })
                })
        })
    },
    deleteIntoRepo({commit},{data,fields}){

         return new Promise((resolve,reject)=>{
            req.deleteIntoRepo({data,fields})
                .then(res=>{
                    resolve(res)
                    commit(types.INTOREPO_DELETE,{
                        data
                    })
                }).catch(error=>{
                    commit(types.INTOREPO_DELETE,{
                        error
                    })
                })
         })
 
    }

}

const mutations = {

        [types.INTOREPO_CREATE](state,{ intoRepo, error }) {
            if (error) {
                state.error = error;
                return;
             }
            state.intoRepos.push(intoRepo)
        },
        [types.INTOREPO_UPDATE](state,{ intoRepo, error }) {
            if (error) {
                state.error = error;
                return
            }
            state.intoRepos.push(intoRepo)

        },
        [types.INTOREPO_DELETE](state,{ data, error }) {
             if (error) {
                state.error = error;
                return
            }
            // state.intoRepos.splice(data.index,1)
        }
};

export default {
    state,
    getters,
    actions,
    mutations
};