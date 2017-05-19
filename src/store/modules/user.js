;
import * as types from '../mutation-types.js';
import * as req from '../../api/user'

const state = {
    users: [],
    error: null,
    signinUser: null
};

const getters = {
    users: state => state.users
};

const actions = {
    createUser( { commit },{ userMessage } ){

        req.createUser(userMessage)
           .then(userMessage=>commit(types.USER_CREATE,{ userMessage }))
           .then(alert('创建成功'));

    },

    getUser({ commit }, argv) {
        
        return new Promise((resolve, reject) => {

            req.getUser(argv)
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    commit(types.USER_INFO, { error });
                });

        });
    },

    getUsers({ commit }) {
        return new Promise((resolve, reject) => {
            req.getUsers()
                .then(users => {
                    commit(types.USERS_LIST, {
                        users
                    })
                })
        })
    },

    userSignin({ commit }, { email, password }) {

        let that = this;
        return new Promise((resolve) => {
            req.signin(email, password).then(res => {
                resolve(res.user);
                commit(types.USER_SIGNIN, {
                    user: res.user
                });
            }).catch(error => {
                commit(types.USER_SIGNIN, {
                    error
                })
            });
        })

    }
};

const mutations = {
    [types.USER_INFO](state, { user, error }) {
        if (error) {
            state.error = error;
        }
    },
    [types.USER_CREATE](state,{ userMessage }){
      state.users.push(userMessage);
    },
    [types.USERS_LIST](state,{ users }){
        state.users = users;
    },
    [types.USER_SIGNIN](state, { user, error }){
        if (error) {
            state.error = error;
            return;
        }
        state.signinUser = user;
        //如果登录完成，则将用户放入LocalStore
        localStorage.user = JSON.stringify(user);
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};