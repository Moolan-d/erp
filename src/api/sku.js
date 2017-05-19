import { client } from "./index"


export default {
    createSku(skuforms){
    let query= `{
                 sku: createSku(properties:"${skuforms.properStr}",
                
                    product:${skuforms.product},
                    goodsNo:"${skuforms.goodsNo}",
                    unit:"${skuforms.unit}")  {
                        id,
                        properties,
                        goodsNo,
                        intoRepos { 
                          createdAt
                        }
                    }
                }`
    return client.mutate(query)
},


    update(updateForm) {
        let query=`{
                updateSku:updateSku(properties:"${updateForm.properties}",
                    id:${updateForm.id},
                    product:${updateForm.product},
                    goodsNo:"${updateForm.goodsNo}",
                    unit:"${updateForm.unit}"
                    ) {
                        properties,
                        id,
                        unit,
                        goodsNo      
                }
            }`
    return client.mutate(query)
    }

};
