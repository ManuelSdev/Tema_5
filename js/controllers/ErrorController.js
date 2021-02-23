import BaseControler from './BaseControler.js'
import { errorView } from '../views.js'

export default class ErrorController extends BaseControler{

    constructor(element){
        super(element)
        //Cuando se produzca el evento error, lo capturo y a llamo al meth showError
        this.subscribe(this.events.ERROR, (error)=>{
            this.showError(error)
        })
    }

    showError(errorMessage){
        this.element.innerHTML = errorView(errorMessage)
        this.element.classList.remove('hidden')
        //Este evento esconde el panel error al clicar fuera de él 
        //Fuera de él es .global-errors
        //El manejador recibe como parámetro un objeto de tipo evento (event)
        this.element.addEventListener('click', (event)=>{  
            if(event.target== this.element || event.target.classList.contains('delete')){
                this.element.classList.add('hidden')
            }
        })
    }

}