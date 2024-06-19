const axios = require("axios")

class BaseController {
    constructor(){
        this._options = {
            baseURL: "https://qauto.forstudy.space/api",
            validateStatus:() => true
        }
        this._axios = axios.create(this._options)
    }
    async login(){
        let authResponse = await this._axios.post("/auth/signin", {
            email: "test952@test.com",
            password: "Test123!",
            remember: false
        })
        const sid = authResponse.headers["set-cookie"][0].split(";")[0]
        //console.log(sid)
        this._options.headers = {Cookie: sid}
    }

    async get(url){
        return this._axios.get(url, this._options)
    }

    async post(url, body){
        return this._axios.post(url, body, this._options)
    }

    async delete(url, body){
        return this._axios.delete(url, {
            ...this._options,
            ...{data: body}
        } )
    }
}

module.exports.BaseController = BaseController