// --------------- CORAÇÕES ---------------


const containerCoracoes = document.getElementById("container-coracoes");
const vidas = Number(localStorage.getItem("vidas")) || 0;

for (let i = 0; i < vidas; i++) {
    const coracao = document.createElement("span");

    coracao.classList.add("material-symbols-outlined", "coracao");
    coracao.setAttribute("aria-hidden", "true");
    coracao.textContent = "favorite";

    containerCoracoes.appendChild(coracao);
}



// Seleciona todos os corações
const coracoes = document.querySelectorAll(".coracao");
// localStorage.setItem("vidas", coracoes.length);

// Função que tira um coração
function perderCoracao() {
    console.log(Number(localStorage.getItem("vidas")))

    // Verifica se ainda tem corações
    if (Number(localStorage.getItem("vidas")) > 1) {

        // Diminui uma vida
        localStorage.setItem("vidas", Number(localStorage.getItem("vidas")) - 1);

        // Pega o coração que será alterado
        const coracao = coracoes[Number(localStorage.getItem("vidas"))];

        // Adiciona a classe vazio
        coracao.classList.add("vazio");
    }
    else {
        console.log('entrou');
        window.location.href = "home.html"
    }
}

// --------------- LIBERA SETA (NAVEGAÇÃO) ---------------

// Seleciona a seta
const seta = document.querySelector(".seta");

// Função que libera a seta
function liberarSeta() {

    // Remove o bloqueio da seta
    seta.classList.remove("bloqueada");

    // Adiciona a animação
    seta.classList.add("liberada");
}

// --------------- BARRA DE PROGRESSO ---------------

// Seleciona a barra de progresso.
const progresso = document.querySelector("progress");

// Função que incrementa valor da barra de progresso.
function atualizarProgresso(valor) {
    progresso.value = valor;
}
