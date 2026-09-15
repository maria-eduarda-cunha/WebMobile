// Seleciona os botões do HTML
const opcoes = document.querySelectorAll(".opcao-video");

const respostaCorreta = "gif 3";

// Passa por todo os botões
opcoes.forEach((opcao) => {

    // Altera o elemento caso clique
    opcao.addEventListener("click", () => {

        const resposta = opcao.querySelector("img").alt;

        // Se resposta certa, classe de article = "correta"
        if (resposta === respostaCorreta) {
            opcao.classList.add("correta");
            liberarSeta(); // pode clicar na seta

        
        // Se resposta errada, classe de article = "errada"
        } else {
            opcao.classList.add("errada");
            perderCoracao(); // perde vida
        }

    });
});