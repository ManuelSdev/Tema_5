//Aquí pongo la lógica de las vistas para separarla del resto según MVC
//A esta vista le paso un tuit y devuelve html
export const tweetView = (tweet)=>{
    return ` <div class="posts">
    <strong class="author">${tweet.author}</strong>
    <p class="message">${tweet.message}</p>
    <time datetime="${tweet.date}">${tweet.date}</time></div>`;
}