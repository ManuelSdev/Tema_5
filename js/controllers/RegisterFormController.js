import BaseController from "./BaseController.js";

export default class RegisterFormController extends BaseController{
    constructor(element){
        super(element)
        this.attachEventListener()
    }
    //Este es el manejador de eventos para el submit
    attachEventListener(){
        this.element.addEventListener('submit', (event)=>{
            //Evitamos que se envie el formulario (comportamiento por defecto)
            event.preventDefault()
            console.log('SE ENVIA EL FORMULARIO', this.element,validity)
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

