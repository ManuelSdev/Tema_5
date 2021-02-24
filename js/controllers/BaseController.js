import pubSub from '../services/Pubsub.js'

export default class BaseController{
    constructor(element){
        //la variable element almacena el nodo concreto que controlará
        //cada controlador
        this.element=element
        this.pubSub=pubSub
        this.events ={
            START_LOADING: 'startLoading',
            FINISH_LOADING: 'finishLoading',
            ERROR: 'error'
        }
    }
    //EventHandler es la callback que indica que hacer al escuchar el evento
    subscribe(eventName, eventHandler){
        this.pubSub.subscribe(eventName, eventHandler)
    }
    //eventData es info/datos del evento ocurrido
    //Ej: hay un error...pues el mensaje del error que ha ocurrido
    publish(eventName, eventData){
        this.pubSub.publish(eventName, eventData)
    }

}
