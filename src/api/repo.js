
import { client } from "./index"

function createRepo(repoForm) {

    let mutate = `
    {
        repos:createRepo(
        name: "${repoForm.name}", 
        address: "${repoForm.address}", 
        keepers: "${repoForm.keepers}",
        contact:"${repoForm.contact}",
        phone:"${repoForm.phone}") {
            name,
            id,
            address,
            contact,
            phone

        }
    }
    `
    return client.mutate(mutate);

}


function getRepos({page=1, limit=15, order="createdAt DESC", filters={}, fields="id"}) {

    let  query = `
    {
        repos: repos(
            page:${0}, 
            limit:${20}, 
            order:"createdAt DESC",
            filters: "${JSON.stringify(filters).replace(/"/g, '\\"')}"
        ){
            ${fields}
        }
    }
    `
    return client.query(query);

}

function updateRepo({ data, fields }) {
   
    let mutate = `
    {

        repo:updateRepo(
            name: "${data.name}",
            id:${data.id},
            address: "${data.address}",
            contact: "${data.contact}",
            phone: "${data.phone}",
            keepers: "${data.keepers}"
        ) {
            ${fields}
        }
    }
    `
    return client.mutate(mutate);

}

export {
    createRepo,
    getRepos,
    updateRepo
}
