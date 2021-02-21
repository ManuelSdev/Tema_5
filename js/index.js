import {tweetView} from './views.js'
//Importas servicio que devuelve los tuits
import dataService from './services/DataService.js'
import prueba from './prueba.js'
import PostListController from './controllers/PostListController.js';


window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM fully loaded and parsed');
    const loader = document.querySelector('.lds-roller')
    //Una forma de esconder
    //loader.style.display='none';
    //Otra
    loader.classList.add('hidden')
    //Selecciono el elemento que quiero controlar
    const element = document.querySelector('.posts-list')
    //Creamos un controlador y le pasamos el elemento DOM que tiene que manejar
    const controller = new PostListController(element)
    //Ahora le digo al controlador que cargue los post
    controller.loadPost()


});