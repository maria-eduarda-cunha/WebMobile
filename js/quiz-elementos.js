// --------------- CORAÇÕES ---------------

// Seleciona todos os corações
const coracoes = document.querySelectorAll(".coracao");

// Quantidade de corações do usuário
let vidas = coracoes.length;

// Função que tira um coração
function perderCoracao() {

    // Verifica se ainda tem corações
    if (vidas > 0) {

        // Diminui uma vida
        vidas--;

        // Pega o coração que será alterado
        const coracao = coracoes[vidas];

        // Adiciona a classe vazio
        coracao.classList.add("vazio");
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
