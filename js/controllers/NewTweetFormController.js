import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";

export default class NewTweetFormController extends BaseController{

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
  
    }

    async checkIfUserIsLogged(){
        //Guardamos en una var si es true o false que esté logado
        const userIsLogged = await dataService.isUserLogged();
        if (!userIsLogged) {
            //Si no lo está, o mandamos al login
            window.location.href = '/login.html';
        } else {
            //Si está logado, publicamos evento de ocultación del loader
            
            this.publish(this.events.FINISH_LOADING);
        }
    }

    attachEventListeners(){

    }






}