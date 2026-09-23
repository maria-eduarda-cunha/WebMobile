const textos = document.querySelectorAll(".container-texto article");
const videos = document.querySelectorAll(".container-video p");

textos.forEach(texto => {
    texto.setAttribute('draggable', 'true');
    texto.setAttribute('ondragstart', 'dragstartHandler(event)');
});

videos.forEach(video => {
    video.setAttribute('ondrop', 'dropHandler(event)');
    video.setAttribute('ondragover', 'dragoverHandler(event)');
});

function dragstartHandler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
    ev.preventDefault();
}

let resp_corretas = 0;
function dropHandler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const texto = document.getElementById(data);
    ev.target.textContent = texto.textContent;
    
    const opcao = ev.target;
    const i = Number.parseInt(opcao.id.split('-')[1])
    if(opcao.innerText === "Seleção"+i){
        resp_corretas++;
        console.log(resp_corretas);
    }
    
    
    if(resp_corretas === 3){
        alert('acertou')
    }
}
