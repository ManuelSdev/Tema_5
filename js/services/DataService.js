
const url = 'https://gist.githubusercontent.com/kasappeal/a8724e3f1c75ba515a8d9500f4b609e7/raw/4733ee642e4cf01e95ff4284d6e252d0706804b0/fweets.json'

export default{
    //Servicio que devuelve los tuits
    getTweets: ()=>{
        const promise = new Promise ((resolve, reject) => {
            //const response=  await fetch(url)
            //FORMA FEA CON THEN
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

        })
        return promise
    }
}