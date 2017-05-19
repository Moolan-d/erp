import { client } from "./index"

export default {

    //获取所有品牌
    getBrands() {
        
           
        let query=  `{
                 brands:brands(page:${0},limit:${20}){
                        rows{
                            id,
                            name,
                        },
                    }
                }`
        return client.query(query);  
    },
    //获取单一品牌
    getbrand() {

    },
    updateBrand() {

    },
    //创建品牌
    createBrand(brandForm) {
       
        let query=`{
                    brand:createBrand(name:"${brandForm.brand}"){
                        id,
                        name
                    }
                }`
        return client.mutate(query)   
    },
    update(updateForm) {

        let query=   `{
                updateBrand:updateBrand(name:"${updateForm.name}",
                id:${updateForm.id}){
                    name,
                    id,
                    createdAt
                }
            }`
      
        return client.mutate(query) 
    }
};