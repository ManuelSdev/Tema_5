function sacaTuits(){
    return [
        {
            author: "@Manuel",
            message: "Mensaje pruebaaaaa de Manuelllll",
            date: "19/02/2021 10:30"
        },
        {
            author: "@Paquito",
            message: "Mensaje pruebaaaaa de Paquitoooo",
            date: "19/02/2021 23:45"
        }
    ]
}

export default{
    //Servicio que devuelve los tuits
    getTweets: ()=>{
        setTimeout(sacaTuits, 7000);

    }
}