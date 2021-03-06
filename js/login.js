//Este login.js controlará la pagina de resgistro login.html

import LoaderController from './controllers/LoaderController.js'
import ErrorController from './controllers/ErrorController.js'
import LoginFormController from './controllers/LoginFormController.js'


window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM fully loaded and parsed');

    //Aquí también usaremos el loader mientras se valida
    const loader = document.querySelector('.lds-roller')
    const loaderController= new LoaderController(loader)

    //Tambien necesitaremos el controlador de errores por si falla algo con el servidor
    const errorsElement = document.querySelector('.global-errors')
    const errorController = new ErrorController(errorsElement)
    
    const formElement = document.querySelector('form')
    const formController = new LoginFormController(formElement)
    //Tb sirve hacer directamente new LoginFormController(formElement), sin guardarlo en una variable...
    //...total, la variable no se utiliza


});