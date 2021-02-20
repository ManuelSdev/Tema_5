import {tweetView} from './views.js'
//Importas servicio que devuelve los tuits
import dataService from './services/DataService.js'
import prueba from './prueba.js'


window.addEventListener('DOMContentLoaded', (event) => {
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

    //Creamos array de objetos literales para guardar tuits
    //Luego hemos metido el array en DataService.js/ meth getTweets...
    //los pillamos de ahí mediante promesa
    const tweetsPromise =  dataService.getTweets()
    //Aquí llega la función "encargo al servidor": si rula, haz usa el callback del then
    //llamando a resolve...si no rula, usa el callback del catch llamando a reject
    tweetsPromise.then(cargarTweets).catch(avisarDelError)

 
});