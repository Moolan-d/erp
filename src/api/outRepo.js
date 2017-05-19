import { client } from "./index"

function getOutRepos({page=1, limit=15, order="createdAt DESC", filters={}, fields="", group=''}) {

    let  query = `
    {
        outRepos: outRepos(
            page:${page}, 
            limit:${limit}, 
            order:"${order}",
            filters: "${JSON.stringify(filters).replace(/"/g, '\\"')}",
            group: "${JSON.stringify(group).replace(/"/g, '\\"')}"
        ){
            ${fields}
        }
    }
    `
    return client.query(query);

}

export {
    getOutRepos
}
