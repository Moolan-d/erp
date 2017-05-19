import Lokka from 'lokka'
import { Transport } from 'lokka-transport-http'

const ENV = process.env.NODE_ENV;
let API_URL = "http://127.0.0.1:8000/graphql"
if (ENV == "production") {
    API_URL = "https://erp.freshin.com/api/graphql"
} 

class Client {

    constructor() {
        this.transport = new Lokka({
            transport: new Transport(API_URL)
        });
    }

    get request() {
        let headers = {};
        let token = null;

        if (localStorage.user) {
            let user = localStorage.user;
            try {
                user = JSON.parse(user);
                token = user.token;
            }catch(e) {
                //pass
            }
        }
        if (token) {
            this.transport._transport._httpOptions.headers["x-api-token"] = token;
        }
        return this.transport;
    }

    query (query) {

        let that = this;
        return new Promise((resolve, reject) => {
            that.request.query(query).then(res => {
                resolve(res);
            }).catch(e => {
                if (e.rawError) {
                    let error = e.rawError[0];
                    if (error) {
                        return reject(error.message);
                    }
                }
                reject("服务异常");
            });
        });

    }

    mutate (query) {

        let that = this;
        return new Promise((resolve, reject) => {
            that.request.mutate(query).then(res => {
                resolve(res)
            }).catch(e => {
                if (e.rawError) {
                    let error = e.rawError[0];
                    if (error) {
                        let messge = error.message;
                        return reject(messge);
                    }
                }
                reject({
                    code: 500,
                    msg: "服务器异常"
                });
            });
        })

    }

}


let client = new Client();

export {
    client
}