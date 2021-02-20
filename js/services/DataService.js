function getTheFakinTweets(){
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
        const promise = new Promise ((resolve, reject) => {
            setTimeout(() => {
                console.log('HE CONSEGUIDO LOS TWEETS!!!!!')
                const tweets = getTheFakinTweets()
                if( tweets.length===0){
                    reject(tweets)
                }else{
                    resolve(tweets)
                }
            }, 5000);
        })
        console.log('TE PROMETO QUE CONSEGUIRÉ LOS TUITS, NOMÁS DEJA QUE GESTIONE LA PROMESA')
        return promise
    }
}