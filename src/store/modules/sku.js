import req from '../../api/sku.js';
import * as types from '../mutation-types.js';


const state = {
    prdMessage: {},
    skus:[],
    skuMessage:{},
    error:null
};

const getters = {
    
    prdmessage: state => state.prdMessage,
    skumessage: state => state.skuMessage
};

const actions = {

    createSku( { commit },{ skuforms } ){

        return new Promise((resolve, reject) => {
            req.createSku(skuforms)
                .then(res => {
                    resolve(res)
                    commit(types.SKU_CREATE, {
                        res
                    })
                })
                .catch(error => {
                    resolve(res)
                    commit(types.SKU_CREATE, {
                        res
                    })
                })
        })
       
    },
    
    
//获取商品页跳转信息
    sharePrd( { commit },{ prd } ) {

        commit(types.SHARE_PRDID,{ prd })
    },

//入库页获取SKU信息
    shareSku( { commit },{ skuIdForm } ) {

        commit( types.SHARE_SKU,{ skuIdForm } )
    },

    updateSku( { commit },{ updateForm }) {

        return new Promise((resolve, reject) => {
            req.update(updateForm)
                .then(res => {
                    resolve(res)
                    commit(types.SKU_UPDATE, {
                        res
                    })
                }).then(window.location.reload("#/home/center/products"))
                .catch(error => {
                    commit(types.SKU_UPDATE, {
                        res
                    })
                })
        })
    }

};

const mutations = {
    [types.SHARE_PRDID](state,{ prd, error }) {
        if (error) {
            state.error = error;
            return;
        }
        state.prdMessage['name'] = prd.name
        state.prdMessage['id'] = prd.id
        state.prdMessage['brandId'] = prd.brandId
        state.prdMessage['categoryId'] = prd.categoryId

    },
    [types.SHARE_SKU](state,{ skuIdForm,error }) {
        if (error) {
            state.error = error;
            return;
        }
        state.skuMessage['name'] = skuIdForm.productName
        state.skuMessage['properties'] = skuIdForm.properties
        state.skuMessage['id'] = skuIdForm.skuId
    },
    [types.SKU_CREATE](state,{ newsku,error }) {
        if (error) {
            state.error = error;
            return;
        }
        state.skus.push(newsku)
    },
    [types.SKU_UPDATE](state,{ updateForm,error }) {
        if (error) {
            state.error = error;
            return;
        }
        state.skus.push(updateForm)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};