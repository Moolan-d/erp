import * as req from '../../api/repo.js';
import * as types from '../mutation-types';

const state = {
    repos: [],
    error:null
}

const getters = {
    repos: state => state.repos
}

const actions = {
    filterRepos({}, argv) {
        return req.getRepos(argv);
    },
    getRepos({ commit }, argv) {
        return new Promise((reslove,reject) => {
             req.getRepos(argv)
              .then(res => {
                reslove(res)
                commit(types.REPO_LIST, { repos: res.repos });
            }).catch(error=>{
                commit(types.REPO_LIST,{ error })
            })
        })          
    },
    createRepo({ commit },{ repoForm }) {
        return new Promise((reslove,reject)=>{
            req.createRepo(repoForm)
                .then(repoForm => {
                    reslove(repoForm)
                    commit(types.REPO_CREATE, {
                        repoForm
                    });
                }).catch(error => {
                    commit(types.REPO_CREATE, error);
                })
        })
            
    },
    updateRepo({commit},{data, fields}) {
        return new Promise((reslove, reject) => {
            req.updateRepo({
                    data,
                    fields
                })
                .then(res => {
                    reslove(res)
                }).catch(error => {
                    commit(types.REPO_UPDATE, {
                        error
                    })
                })
        })
    }
 
}

//定义行为
const mutations = {
    [types.REPO_LIST](state, { repos,error }) {
        if (error) {
            state.error = error;
            return
        }
        state.repos = repos;
    },
    [types.REPO_CREATE](state,{ repoForm,error }) {
         if (error) {
            state.error = error;
            return
        }
        state.repos.push(repoForm)
    },
    [types.REPO_UPDATE](state,{ res,error }) {
         if (error) {
            state.error = error;
            return
        }
    }
}

export default {

    state,
    getters,
    actions,
    mutations
}
