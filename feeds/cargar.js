
const principal=document.getElementById('principal');

fetch('./noticias.json').then(res => res.json())
.then(data => {
    data.news.forEach(cont =>{
        let content ;
        if(!cont.content){content='';}else{content=cont.content}
        const html=`<div class="noticias">
            <h1 class="titulo">${cont.title}</h1>
            <img src="${cont.urlToImage}" alt="image not found" class="image">
            <p class="fecha">${cont.publishedAt}</p>
            <p class="autor"><strong>Autor: </strong>${cont.author}</p>
            <p class="contenido">${content}</p>
            <a href="/editarContenido" id="${cont.id}" class='enlase' >Editar Contenido</a>
            </div>`;
        principal.innerHTML+=html;
    });
});
