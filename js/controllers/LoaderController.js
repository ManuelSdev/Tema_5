import BaseControler from './BaseControler.js'

export default class LoaderController extends BaseControler{

    constructor(element){
        super(element)
        this.subscribe(this.events.START_LOADING, ()=>{
            this.showLoading()
        })
        this.subscribe(this.events.FINISH_LOADING, ()=>{
            this.hideLoading()
        })

    }
    //Se muestra quitando clase hidden
    showLoading(){
        this.element.classList.remove('hidden')

    }

    //Se oculta añadiendo clase hidden
    hideLoading(){
        this.element.classList.add('hidden')

    }
}