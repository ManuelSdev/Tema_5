
import BaseController from './BaseController.js'
import dataService from '../services/DataService.js';

export default class NewTweetOrLoginController extends BaseController{
    //Hacemos la comprobacion del token (usuario ya logado) directamente...en el constructor
    constructor(element){
        super(element)
        this.checkIfUserIsLogged()
    }

    async checkIfUserIsLogged(){
        const userIsLogged = await dataService.isUserLogged()
        if(userIsLogged){
            //Mostrar botón de nuevo tuit
            const newTweetButton = this.element.querySelector('.new-tweet-button');
            newTweetButton.classList.remove('is-hidden');
        }else{
            //mostrar botón de login o registro
            const loginRegisterButtons = this.element.querySelector('.login-register-buttons');
            loginRegisterButtons.classList.remove('is-hidden');
        }
    }
}