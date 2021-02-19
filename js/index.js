import {tweetView} from './views.js'
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const loader = document.querySelector('.lds-roller')
    //Una forma de esconder
    //loader.style.display='none';

    //Otra
    loader.classList.add('hidden')
    //Creamos array de objetos literales para guardar tuits
    const tweets =[
        {
            author: "@Manuel",
            message: "Mensaje pruebaaaaa de Manuelllll",
            date: "19/02/2021 10:30"
        },
        {
            author: "@Paquito",
            message: "Mensaje pruebaaaaa de Paquitoooo",
            date: "19/02/2021 23:45"
        }


    ]
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