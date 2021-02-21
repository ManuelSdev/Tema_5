import BaseControler from './BaseControler.js'

export default class LoaderController extends BaseControler{
    //Se muestra quitando clase hidden
    showLoading(){
        this.element.classList.remove('hidden')

    }

    //Se oculta añadiendo clase hidden
    hideLoading(){
        this.element.classList.add('hidden')

    }
}