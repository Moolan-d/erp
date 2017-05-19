import { client } from "./index"
import md5 from 'md5'


function signin(email, password) {

    password = md5(password);

    let  mutationQuery = `
    {
        user: signin(email:"${email}", password:"${password}"){
            token,
            userId,
            displayName
        }
    }
    `
    return client.mutate(mutationQuery);

}

function getUser({id, fields}) {

    let query = `
    {
        user: user(id: ${id}) {
            ${fields}
        }   
    }
    `
    return client.query(query);

}
//用户注册
function createUser(userMessage) {

   let mutate=`{
        user:createUser(email:"${userMessage.email}",
        displayName:"${userMessage.displayName}",
        password:"${userMessage.password}",
        isSuper:${userMessage.isSuper})
        {
            id,
            email,
            displayName
        }
   }`
   return client.mutate(mutate)
}

//所有用户

function getUsers() {
    let query=`{
        users:users(limit:${15},order:"createdAt DESC",page:${1}){
            rows{
                id,
                displayName,
                email
            }
        }
    }`
    return client.query(query)
}

export {
    signin,
    getUser,
    createUser,
    getUsers
}

