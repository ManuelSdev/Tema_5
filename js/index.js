import {tweetView} from './views.js'
//Importas servicio que devuelve los tuits
import dataService from './services/DataService.js'
import prueba from './prueba.js'


window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM fully loaded and parsed');

    const loader = document.querySelector('.lds-roller')
    //Una forma de esconder
    //loader.style.display='none';

    //Otra
    loader.classList.add('hidden')

    //función que se usa como resolve ( ok) en la promesa
    const  cargarTweets = (tweets)=>{
        console.log('BIEN!! VOY A PINTAR LOS TWEETS')
        const list = document.querySelector('.posts-list')
        //Teniendo la plantilla html para un tuit, creamos más a partir de ella
        for(const tweet of tweets){
            const tweetElement = document.createElement('article');
            const tweetHTML = tweetView(tweet)
            //meto el tropezón como código html de const twweet
            tweetElement.innerHTML=tweetHTML;
            //Selecciono la etiqueta main mediante su clase .post-list
            
            list.appendChild(tweetElement)
        }
    }
    //función que se usa como reject (error) cuando hay un error en la promesa
    const avisarDelError = (error) => {
        console.error('NO SE HAN PODIDO CARGAR LOS TWEETS')
    }
    /*
    //Creamos array de objetos literales para guardar tuits
    //Luego hemos metido el array en DataService.js/ meth getTweets...
    //los pillamos de ahí mediante promesa
    const tweetsPromise =  dataService.getTweets()
    //Aquí llega la función "encargo al servidor": si rula, haz usa el callback del then
    //llamando a resolve...si no rula, usa el callback del catch llamando a reject
    tweetsPromise.then(cargarTweets).catch(avisarDelError)
    */
   //Hacemos lo anterior en un solo paso
   
   //dataService.getTweets().then(cargarTweets).catch(avisarDelError)
   //VAMOS A GESTIONAR LA LINEA DE ARRIBA CON ASYNC AWAIT
   try {
        //Aquí ya tenemos los tuits cargados en la variable tweets
        const tweets = await dataService.getTweets()
        //Esos tuits los pasamos como parametros al meth cargarTweets
        cargarTweets(tweets)
   } catch (error) {
       avisarDelError(error)
   }

 


   const url = 'https://gist.githubusercontent.com/kasappeal/a8724e3f1c75ba515a8d9500f4b609e7/raw/4733ee642e4cf01e95ff4284d6e252d0706804b0/fweets.json'
   
   /*//La petición al servidor no recibe datos: recibe una respuesta que contiene datos y más cosas
   //Pongo en then lo que quiero hacer con esa respuesta
    fetch(url).then((response)=>{
        console.log('RESPUESTA RECIBIDA', response)
        //Ahora digo que quiero extraer de la respuesta...
        //...y me lo dan en promesa: usaré gestión de promesas then-catch
        response.json().then((data)=>{
            console.log('ESTOS SON LOS DATOS', data)+++++++++++
        }).catch(error=>{
        })
    }).catch((error)=>{
        console.error('La petición ha fallado')
    })
    */
   //AHORA VERSIONAMOS EL TROPEZÓN ANTERIOR CON AWAIT, DESPUES DE HABER PUESTO
   // ASYNC EN LA FUNCIÓN QUE ENGLOBA ESTO
   //El manejo de errores-catch se hace añadiendo try
   try{
        const response = await fetch(url)
        const data = await response.json()
        console.log('ESTOS SON LOS DATOS', data)//++++++++
   } catch (error){
       console.error('SE HA PRODUCIDO UN ERROR', error)
   }


});