import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewTweetFormController from './controllers/NewTweetFormController.js';


window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.lds-roller');
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    const formElement = document.querySelector('form');
    new NewTweetFormController(formElement);
});
