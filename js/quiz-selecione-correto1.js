
// Seleciona os botões do HTML
const opcoes = document.querySelectorAll(".secao-quiz article");

const respostaCorreta = "Seleção1";

// Passa por todo os botões
opcoes.forEach((opcao) => {

    // Altera o elemento caso clique
    opcao.addEventListener("click", () => {

        const resposta = opcao.querySelector("p").textContent; // Pega o texto da seleção

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