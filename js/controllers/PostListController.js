//Importamos clase de la que esta hereda
import BaseController from './BaseController.js'
import dataService from '../services/DataService.js'
import {tweetView} from '../views.js'



export default class PostListController extends BaseController{

    render(tweets){
        this.element.innerHTML = ''; // borramos cualquier tweet que pueda verse en pantalla
        for (const tweet of tweets){
            const article = document.createElement('article')
            article.innerHTML= tweetView(tweet)
            const deleteButton = article.querySelector('button');
            if (deleteButton) {
                deleteButton.addEventListener('click',async ev=>{
                    const deleteConfirmed =confirm('¿Seguro que quieres borrarlo?')
                    if(deleteConfirmed){
                        console.log('BORRAR EL TUIT', tweet)
                        await dataService.deleteTweet(tweet)
                        article.remove() //borra inmediatamente el tuit para que el usuario no lo vea
                        await this.loadPost() //recarga lista de tuits tras borrar
                    }

                })
                
                //new DeleteButtonController(deleteButton, tweet);
            }
            //Ahora hacemos referencia al elemento del DOM
            //que es controlado por este controlador
            this.element.appendChild(article)
        }
    }

    
    async loadPost(){
        //En index.js añadi el atributo loader a una instancia de PostListController...lo uso
        this.publish(this.events.START_LOADING, {})
        try {
            //this.loader.showLoading()
            //Aquí ya tenemos los tuits cargados en la variable tweets
            const tweets = await dataService.getTweets()
            //Esos tuits los pasamos como parametros al meth cargarTweets
            this.render(tweets)
        } catch (error) {
            console.error(error)
            this.publish(this.events.ERROR, error)
        } finally{
            //Esto se ejecuta siempre, vaya bien (try) o mal (catch)
            //this.loader.hideLoading()
            this.publish(this.events.FINISH_LOADING, {})
        }
    }
}