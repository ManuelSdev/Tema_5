import {tweetView} from './views.js'
//Importas servicio que devuelve los tuits
import dataService from './services/DataService.js'

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const loader = document.querySelector('.lds-roller')
    //Una forma de esconder
    //loader.style.display='none';

    //Otra
    loader.classList.add('hidden')
    //Creamos array de objetos literales para guardar tuits
    //Luego hemos metido el array en DataService.js/ meth getTweets...
    //los pillamos de ahí
    const tweets = dataService.getTweets()
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

});