//Aquí pongo la lógica de las vistas para separarla del resto según MVC
//A esta vista le paso un tuit y devuelve html
export const tweetView = (tweet) => {

  let deleteButtonHTML = '';
  if (tweet.canBeDeleted) {
    deleteButtonHTML = '<button class="button is-danger">Borrar</button>';
  }
  let imgHTML = '';
  if (tweet.image) {
    imgHTML = `<div class="card-image">
      <figure class="image is-4by3">
      <img src="${tweet.image}" alt="Placeholder image">
      </figure>
  </div>`;
  }
  return `<div class="card">

    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">${tweet.author}</p>        
        </div>
      </div> 
      <div class="content">
        ${tweet.message}
        <br>
        <time datetime="${tweet.date}">${tweet.date}</time></div>
        <br>
        ${deleteButtonHTML}
      </div>
    </div>
    <div>
      ${imgHTML}
    </div>
  </div>`;
}

export const errorView = (errorMessage) => {
  return `<article class="message is-danger">
    <div class="message-header">
      <p>Error</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
        ${errorMessage}
    </div>
</article>`
}