//Importamos clase de la que esta hereda
import BaseController from './BaseControler.js'
import dataService from '../services/DataService.js'
import {tweetView} from '../views.js'
import pubSub from '../services/Pubsub.js'


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
        //En index.js añadi el atributo loader a una instancia de PostListController...lo uso
        pubSub.publish('startLoading', {})
        try {
            //this.loader.showLoading()
            //Aquí ya tenemos los tuits cargados en la variable tweets
            const tweets = await dataService.getTweets()
            //Esos tuits los pasamos como parametros al meth cargarTweets
            this.render(tweets)
        } catch (error) {
            console.error(error)
            pubSub.publish('error', error)
        } finally{
            //Esto se ejecuta siempre, vaya bien (try) o mal (catch)
            //this.loader.hideLoading()
            pubSub.publish('finishLoading', {})
        }
    }
}