const BASE_URL= 'http://127.0.0.1:8000'
const TOKEN_KEY ='token'
/*
const url = `https://gist.githubusercontent.com/kasappeal/
a8724e3f1c75ba515a8d9500f4b609e7/
raw/4733ee642e4cf01e95ff4284d6e252d0706804b0/fweets.json`
*/

//CLAVE: en los servicios no usar arrows al definir los meths por el tema del this
export default {
    //Servicio que devuelve los tuits
    /*
    getTweets: ()=>{
        const promise = new Promise (async (resolve, reject) => {
            //FORMA FEA CON THEN+++++++++++++++++++++++++++++
            //Fetch devuelve una promesa
            //Si se cumple, formateamos a json mediante otra promesa
            //Si esta se cumple, ya tenemos acceso a los datos
            //Entonces hacemos el resolve
            //...que usará la funcion definida en la función 
            //conectada que consuma la promesa que devuelve getTweets
            //OLE
            
            fetch(url).then(response => response.json()).then(data=>{
                resolve(data)
            })
            
           //FORMA BONITA CON AWAIT
           const response=  await fetch(url)
           const data = await response.json()
           resolve(data)
        })
        return promise
    }
    */
    //FORMA AUTENTICA CON SYNC AWAIT SIN USAR NEW PROMISE
    getTweets: async function (){
       // const url=`${BASE_URL}/api/posts`
       const url=`${BASE_URL}/api/messages?_expand=user&_sort=id&_order=desc`;
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            //En lugar de retornar directamente los datos del viejo json, manipulamos 
            //los datos del nuevo json antes de retornar
            //Vamos a meter los valores del nuevo json cambiando los nombres de los atributos que los contienen
            //Queremos atributos con nombres como author, message, y date para que se lo trague el view.js
            //return data
            return data.map(tweet =>{
                console.log(tweet.user)
                return{
                    
                    message: tweet.message,
                    //Si el tuit no tiene createdAt, pilla el updatedAt
                    date: tweet.createdAt || tweet.updatedAt,
                    author: tweet.user.username
                }
            })
        } else {
            throw new Error(`HTTP Error: ${response.status} `)
        }
    },
    /*
    registerUser: async (user) =>{
        //Las cabeceras siguen dentro del config
        const config ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }
        const url=`${BASE_URL}/auth/register`
        //Guardamos en una var la peticion post a la url
        const response =await fetch (url, config)
        //Si la respuesta es ok, devuelvo los datos
        const data=  await response.json()
        if(response.ok){
            return data
        //Si no es ok, simplemente devuelvo la respuesta que nos dio el servidor    
        }else{
            debugger
            throw new Error(data.message || JSON.stringify(data))
        }
    }

    login: async (user) =>{
        //Las cabeceras siguen dentro del config
        const config ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }
        const url=`${BASE_URL}/auth/login`
        //Guardamos en una var la peticion post a la url
        const response =await fetch (url, config)
        //Si la respuesta es ok, devuelvo los datos
        const data=  await response.json()
        if(response.ok){
            return data
        //Si no es ok, simplemente devuelvo la respuesta que nos dio el servidor    
        }else{
            debugger
            throw new Error(data.message || JSON.stringify(data))
        }
    }
    */
    //REFACTORIZAMOS PARA AGRUPAR LOS MÉTODOS POST (registerUser y login) EN UN METH
    post: async function (url, postData){
        const config ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        }
        const token =await this.getToken()
        if(token){
            config.headers['Authorization']=`Bearer ${token}`
        }
        const response =await fetch (url, config)
        const data=  await response.json()
        if(response.ok){
            return data
        }else{
            // TODO: mejorar gestión de errores
            // TODO: si la respuesta es un 401 no autorizado, debemos borrar el token (si es que lo tenemos);
            throw new Error(data.message || JSON.stringify(data))
        }
    },
    //ENTONCES, registerUser() y login() SE SIMPLIFICAN PORQUE LLAMAN AL METH post()
    registerUser: async function (user) {
        const url=`${BASE_URL}/auth/register`
        return await this.post(url, user)
    },

    login: async function (user) {
        const url=`${BASE_URL}/auth/login`;
        return await this.post(url, user)
    }, 
    
    saveToken: async function(token){
        localStorage.setItem(TOKEN_KEY, token)
    },

    getToken: async function(){
        return localStorage.getItem(TOKEN_KEY)
    },

    isUserLogged: async function(){
        const token = await this.getToken()
        //retorna true si token es distinto de null
        //equivalente a 
        /*
        if (token !==null){
            return true
        }
        */
        return token !==null//devuelve true o false
    },
    saveTweet: async function(tweet) {
        console.log(tweet.user)
        const url = `${BASE_URL}/api/messages`;
        return await this.post(url, tweet);
    }
}