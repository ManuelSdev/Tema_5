import BaseControler from './BaseControler.js'
import { errorView } from '../views.js'

export default class ErrorController extends BaseControler{

    showError(errorMessage){
        this.element.innerHTML = errorView(errorMessage)
        this.element.classList.remove('hidden')

    }

}