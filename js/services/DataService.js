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
        //cogemos el usuario actualmente autenticado
        const currentUser = await this.getUser();
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
                //console.log(tweet.user)
                return{
                    id: tweet.id,
                    message: tweet.message.replace(/(<([^>]+)>)/gi, ""),
                    //Si el tuit no tiene createdAt, pilla el updatedAt
                    date: tweet.createdAt || tweet.updatedAt,
                    author: tweet.user.username,
                    image: tweet.image || null,
                    canBeDeleted: currentUser ? currentUser.userId === tweet.userId : false
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

    post: async function(url, postData, json=true) {
        return await this.request('POST', url, postData, json);
    },

    delete: async function(url) {
        
        return await this.request('DELETE', url, {});
    },

    put: async function(url, putData, json=true) {
        return await this.request('PUT', url, putData, json);
    },
    request: async function(method, url, postData, json=true) {
        
        const config = {
            method: method,
            headers: {},
            body: null
        };
        if (json) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(postData);  // convierte el objeto de usuarios en un JSON
        } else {
            config.body = postData;
        }
        const token = await this.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, config);
        const data = await response.json();  // respuesta del servidor sea OK o sea ERROR.
        if (response.ok) {
            return data;
        } else {            
            // TODO: mejorar gestión de errores
            // TODO: si la respuesta es un 401 no autorizado, debemos borrar el token (si es que lo tenemos);
            throw new Error(data.message || JSON.stringify(data));
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
        //console.log(tweet.user)
        const url = `${BASE_URL}/api/messages`;
        if (tweet.image) {//Si el tuit viene con imagen
            const imageURL = await this.uploadImage(tweet.image);//subo la imagen al servidor y consigo su url
            //reemplazo los datos de la imagen por su url
            tweet.image = imageURL;
        }
        return await this.post(url, tweet);//Guardo en el servidor el tuit con la imagen
    },
    uploadImage: async function(image) {
        const form = new FormData();
        form.append('file', image);
        //Mete en la url en end point del backend para subir archivos
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        //console.log('uploadImage', response)
        //Si no existe respuesta o path, devolvemos un null
        return response.path || null;
    },
    getUser: async function() {
        //Intento pillar info del user y si no lo consiguo, devuelvo un null
        try {
            const token = await this.getToken();
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {//Si la longitud (número de elementos del array) del token es distinta de 3
                return null;//retorno null y salgo del meth
            }
            //en caso de que la longitud sea  3, hago lo que sigue
            const payload = tokenParts[1]; // cogemos el payload, codificado en base64
            //Este payload puede que no sea un json, por eso usamos try catch
            const jsonStr = atob(payload); // descodificamos el base64
            const { userId, username } = JSON.parse(jsonStr); // parseamos el JSON del token descodificado
            return { userId, username };
        } catch (error) {
            return null;
        }
    },

    deleteTweet: async function(tweet) {
        console.log(tweet)
        const url = `${BASE_URL}/api/messages/${tweet.id}`;
        return await this.delete(url);
    }
}