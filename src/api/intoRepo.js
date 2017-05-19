
import { client } from "./index"

function createIntoRepo(data, fields) {
    
    let mutate = `
    {
        intoRepo:createIntoRepo(
            quantity: ${data.quantity}, 
            unitPrice: ${data.unitPrice}, 
            repo: ${data.repo},
            batch:"${data.batch}",
            dealTime: "${data.dealTime}",
            sku: ${data.sku}
        ) {
           ${fields}
        }
    }
    `
    return client.mutate(mutate);
}

function updateIntoRepo({data,fields}){
    let mutate = `
    {
        intoRepo:updateIntoRepo(
            quantity: ${data.quantity}, 
            unitPrice: ${data.unitPrice}, 
            repo: ${data.repo},
            batch:"${data.batch}",
            dealTime: "${data.dealTime}",
            sku: ${data.sku},
            id:${data.id}
        ) {
           ${fields}
        }
    }
    `
    return client.mutate(mutate);
}



function getIntoRepos({data="", filters={}, fields=""}) {

    let  query = `
    {
        intoRepos: intoRepos(
            page:${data}, 
            limit:${14}, 
            order:"createdAt DESC",
            filters: "${JSON.stringify(filters).replace(/"/g, '\\"')}"
        ){
            ${fields}
        }
    }
    `
    return client.query(query);
}

function deleteIntoRepo({data,fields}){
    let query = `
    {
        deleted:deleteIntoRepo(id:${data.id}){
           ${fields}
        }
    }
    `
    return client.mutate(query);
}



export {
    createIntoRepo,
    getIntoRepos,
    updateIntoRepo,
    deleteIntoRepo
}
