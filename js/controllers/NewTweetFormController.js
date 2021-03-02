import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";

export default class NewTweetFormController extends BaseController{

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInTextarea();
    }

    async checkIfUserIsLogged(){
        //Guardamos en una var si es true o false que esté logado
        const userIsLogged = await dataService.isUserLogged();
        if (!userIsLogged) {
            //Si no lo está, o mandamos al login
            //y despues (next) de vuelta a la página del tweet ya logado
            window.location.href = '/login.html?next=/new-tweet.html';
        } else {
            //Si está logado, publicamos evento de ocultación del loader
            
            this.publish(this.events.FINISH_LOADING);
        }
    }
    //Este método directamente el foco en el text area para que el usuario
    //pueda a empezar a escribir directamente una vez cargada la página para escribir
    //un nuevo tuit
    focusInTextarea() {
        const textarea = this.element.querySelector('textarea');
        textarea.focus();
    }
    attachEventListeners(){
        // a medida que el usuario escribe, comprobamos si el formulario es válido para habiltiar o no el botón de enviar
        const textarea = this.element.querySelector('textarea');
        textarea.addEventListener('keyup', () => {
            const button = this.element.querySelector('button');
            if (this.element.checkValidity()) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', true);
            }
        });

        // controlamos cuando se envía el formulario
        this.element.addEventListener('submit', async event => {
            event.preventDefault();  // cancelamos el envío del formulario (comportamiento por defecto)
            const tweet = {
                message: this.element.elements.message.value,
                image: null
            }
            
            if (this.element.elements.file.files.length > 0) {
                tweet.image = this.element.elements.file.files[0];
            }
            
            this.publish(this.events.START_LOADING);
            try {
                //Publico el mensaje y si va bien mando al usuario al index
                await dataService.saveTweet(tweet);
                window.location.href = '/?mensaje=tweetOK'
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally {
                this.publish(this.events.FINISH_LOADING)
            }
        });

    }






}