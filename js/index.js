import {tweetView} from './views.js'
//Importas servicio que devuelve los tuits
import dataService from './services/DataService.js'
import prueba from './prueba.js'
import PostListController from './controllers/PostListController.js';
import LoaderController from './controllers/LoaderController.js'
import ErrorController from './controllers/ErrorController.js'

window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM fully loaded and parsed');

    const loader = document.querySelector('.lds-roller')
    const loaderController= new LoaderController(loader)

    const element = document.querySelector('.posts-list')
    const controller = new PostListController(element)
    //creo un atributo loader en objeto controller que será un objeto loaderController
    //Ahora puedo manejar el loader desde la clase PostListController
    //Lo usaré en el meth loadPost, que es el que sabe cuando se han cargado los tuits
    //controller.loader= loaderController;
    controller.loadPost()
    //VAMOS CON EL CONTROLADOR DE ERRORES
    //Creo un objeto errorController y el nodo/elemento que va a controlar
    const errorsElement = document.querySelector('.global-errors')
    const errorController = new ErrorController(errorsElement)
    //Probamos funcionamiento
    //errorController.showError('ERROR DE PRUEBAAAAAAAAA')
});