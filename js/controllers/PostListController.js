//Importamos clase de la que esta hereda
import BaseController from './BaseControler.js'
import dataService from '../services/DataService.js'
import {tweetView} from '../views.js'


export default class PostListController extends BaseController{

    render(tweets){
        for (const tweet of tweets){
            const article = document.createElement('article')
            article.innerHTML= tweetView(tweet)
            //Ahora hacemos referencia al elemento del DOM
            //que es controlado por este controlador
            this.element.appendChild(article)
        }
    }

    
    async loadPost(){
        //Ahora nos traemos lo que teniamos en index.js hasta el momento
        //dataService.getTweets().then(cargarTweets).catch(avisarDelError)
        //VAMOS A GESTIONAR LA LINEA DE ARRIBA CON ASYNC AWAIT
        try {
            //Aquí ya tenemos los tuits cargados en la variable tweets
            const tweets = await dataService.getTweets()
            //Esos tuits los pasamos como parametros al meth cargarTweets
            this.render(tweets)
        } catch (error) {
            console.error(error)
        }

    }
}