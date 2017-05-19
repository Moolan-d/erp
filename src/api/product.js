import { client } from "./index"

function createProduct( {name, brand, category}) {
        
    let query = `
    {
        product:createProduct(
            name: "${name}", 
            brand: ${brand}, 
            category: ${category}) {
                id,
                name,
                brand {
                    id,
                    name
                },
                category {
                    id,
                    name
                }
        }
    }
    `
    return client.mutate(query);
}

function createProduct2(productForm){
    let query=`{
                    product: createProduct(name:"${productForm.prdname}",
                        brand: ${parseInt(productForm.brd)},
                        category: ${parseInt(productForm.cat)}) {
                            id,
                            name,
                            brand {
                                id
                            },
                            category {
                                id
                            },
                        }
                    }`
          return client.mutate(query)
}

function getProducts({page=1, limit=15, order="createdAt DESC"}) {
    
    let query = `
    {
        products:products(
        
        page: ${page}, 
        limit: ${limit},
        order: "${order}") {
            rows {
                id,
                name,
                category {
                    id,
                    name
                },
                brand {
                    id,
                    name
                },
                skus {
                    id,
                    properties,
                    goodsNo,
                    unit,
                    product {
                        id,
                        name
                    }
                }
            },
            page,
            pages,
            limit
        }
    }
    `
    return client.query(query);

}
function updateProduct({name,id,brand,category}) {

    let mutate = `
    {
        product:updateProduct(
            name: "${name}", 
            id:${id}
            brand: ${brand}, 
            category: ${category}) {
                id,
                name,
                brand {
                    id,
                    name
                },
                category {
                    id,
                    name
                }
        }
    }
    `
    return client.mutate(mutate)
}

export {
    createProduct,
    getProducts,
    updateProduct,
    createProduct2
}