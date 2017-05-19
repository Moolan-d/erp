import { client } from "./index"


export default {

    //获取所有类目
    getCat() {
     let query= `{
                categories(page:${0},limit:${20}){
                    rows{
                        id,
                        name,
            
                    },
                }
            }`
            return client.query(query)
        },

        //创建类目
    createCat(categoryForm) {
       let query=`{
                category:createCatetory(name:"${categoryForm.cats}"){
                    id,
                    name
                    }
                }`
            return client.mutate(query)
        },

    updateCatetory(updateForm) {
        let query=`{
                updateCatetory:updateCatetory(name:"${updateForm.name}",
                id:${updateForm.id}){
                    name,
                    id,
                    createdAt
                }
            }`
            return client.mutate(query)
        }



};