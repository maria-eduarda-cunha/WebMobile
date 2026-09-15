const opcoes = document.querySelectorAll('#opcoes article');
const areaDrop = document.querySelector('#area-drop');
const mensagem = document.querySelector('#mensagem');
const textoDrop = document.querySelector('#texto-drop');

let proximaOrdem = 1;

// QUANDO COMEÇA A ARRASTAR
opcoes.forEach(function (opcao) {
    opcao.addEventListener('dragstart', function (event) {

        const ordem = opcao.dataset.ordem;

        console.log('Arrastando:', ordem);

        event.dataTransfer.setData('text/plain', ordem);
    });
});


// PERMITE SOLTAR NA ÁREA
areaDrop.addEventListener('dragover', function (event) {

    event.preventDefault();

});


// QUANDO SOLTA
areaDrop.addEventListener('drop', function (event) {

    event.preventDefault();

    const ordem = event.dataTransfer.getData('text/plain');

    console.log('Soltou:', ordem);


    // VERIFICA SE É A OPÇÃO CORRETA
    if (Number(ordem) === proximaOrdem) {

        const opcao = document.querySelector(
            `[data-ordem="${ordem}"]`
        );

        // Pega somente o texto do <p>
        const texto = opcao.querySelector('p').textContent;

        // Adiciona o texto na área
        textoDrop.textContent += ' ' + texto;

        // Esconde a opção
        opcao.style.display = 'none';

        // Próxima ordem
        proximaOrdem++;

        mensagem.textContent = 'Correto!';


        // TERMINOU?
        if (proximaOrdem === 5) {

            mensagem.textContent =
                'Parabéns! Você colocou tudo na ordem correta!';

        }

    } else {

        mensagem.textContent =
            'Ops! Essa não é a próxima opção.';

    }

});
