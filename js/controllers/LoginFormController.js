import BaseController from "./BaseController.js";
import dataService from '../services/DataService.js'

export default class LoginFormController extends BaseController{
    constructor(element){
        super(element)
        this.attachEventListener()
    }
    //Este es el manejador de eventos para el submit
    attachEventListener(){
        this.element.addEventListener('submit', async (event)=>{
            //Evitamos que se envie el formulario (comportamiento por defecto)
            event.preventDefault()
            const user={
                //Los datos que metemos están en la propiedad value dentro de cada name
                username: this.element.elements.email.value,
                password: this.element.elements.password.value
            }
            this.publish(this.events.START_LOADING)
            try {
                
                const data = await dataService.login(user)
                //console.log('LOGIN OK', data)
                console.log('LOGIN OK', data.accessToken)
                //guarda el token
                dataService.saveToken(data.accessToken)
                        // TODO: mejorar el control de los query params
                let next = '/';
                const queryParams = window.location.search.replace('?', '');  // ?next=otrapagina -> next=otrapagina
                const queryParamsParts = queryParams.split('=');
                if (queryParamsParts.length >= 2 && queryParamsParts[0] === 'next') {
                    next = queryParamsParts[1];
                  }
                //retornamos a página principal una vez completada la operación de login
                window.location.href=next;
            } catch(error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        })

        //Voy a seleccionar los campos del form para añadir evento que permita saber
        //cuando se han rellenado para activar el botón de login
        //Al hacer un querySelector/querySelectorAll desde element, se buscaran dentro de element
        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button')
            input.addEventListener('keyup', event=>{
                //SI EL IMPUT ES OK LO MARCO EN VERDE Y NO EN ROJO
                if(input.validity.valid){
                    //Mientras sea valido verde
                    input.classList.add('is-success')
                    input.classList.remove('is-danger')
                }else{
                    input.classList.remove('is-success')
                    input.classList.add('is-danger')
                }
                //VALIDO SI FORM ES OK PARA HABILITAR BOTÓN LOGIN
                if(this.element.checkValidity()){
                    button.removeAttribute('disabled')
                    //Él profe lo pone como  button.setAttribute('disabled', false)
                    //Es como si seteara el atributo que estuviera puesto así en el html
                    //<button class="button is-success" disabled = "true">  -->js lo "pone" así cuando usas el disable
                }else{
                    button.setAttribute('disabled', true)                    
                }
            })
   
        });
    }
}

