const BASE_URL= 'http://127.0.0.1:8000'
/*
const url = `https://gist.githubusercontent.com/kasappeal/
a8724e3f1c75ba515a8d9500f4b609e7/
raw/4733ee642e4cf01e95ff4284d6e252d0706804b0/fweets.json`
*/
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
    getTweets: async () => {
        const url=`${BASE_URL}/api/posts`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error(`HTTP Error: ${response.status} `)
        }
    },

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
}