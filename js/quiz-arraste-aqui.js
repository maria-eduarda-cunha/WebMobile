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

function dropHandler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const texto = document.getElementById(data);
    ev.target.textContent = texto.textContent;
}
