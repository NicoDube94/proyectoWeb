
const principal=document.getElementById('principal');

fetch('./noticias.json').then(res => res.json())
.then(data => {
    data.news.forEach(cont =>{
        let content ;
        if(!cont.content){content='';}else{content=cont.content}
        const html=`
            <div class="noticias">
                <h1 class="titulo">${cont.title}</h1>
                <img src="${cont.urlToImage}" alt="image not found" class="image">
                <p class="fecha">${cont.publishedAt}</p>
                <p class="autor"><strong>Autor: </strong>${cont.author}</p>
                <p class="contenido">${content}</p>
                <button id='${cont.id}' class='enlase' name=''>Editar Contenido</button>
                <form method="post" action="">
                    <textarea class="area oculto" name="area"></textarea>
                    <button class="bot oculto" value="boton">Enviar</button>
                </form>
            </div>`;
        principal.innerHTML+=html;
    });
    const b_area=document.querySelectorAll('.enlase');
    
    b_area.forEach(bt=>{
        bt.addEventListener('click',(e)=>{
            console.log(e)
            console.log(e.target.nextElementSibling.firstElementChild)
            if(e.target.name==''){
                e.target.nextElementSibling.firstElementChild.classList.remove('oculto')
                e.target.style.display = 'none';
                e.target.name='echo';
            }
            e.target.nextElementSibling.firstElementChild.addEventListener('focus',(ev)=>{
                ev.target.nextElementSibling.classList.remove('oculto')
                ev.target.nextElementSibling.addEventListener('click',(evt)=>{
                    // evt.preventDefault();
                    let contenido={
                        content:ev.target.value,
                        id:e.target.id
                    }
                    console.log(contenido)
                    fetch('http://localhost:8888/home',{
                    method: 'POST',
                    headers: {
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(contenido)
                    });
                });
            });
        });
    });
});
