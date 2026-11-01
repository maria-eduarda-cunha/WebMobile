import BarraProgresso from "../../../../../components/BarraProgresso";
import Cabecalho from "../../../../../components/Cabecalho";
import QuizSelecao from "../../../../../components/QuizSelecao";
import conteudo from "../../../../../data/conteudos/alfabeto.json";

export default function PaginaQuizInicial() {
  const quiz = conteudo.quizzes["selecione-correto1"];
  return (
    <>
      <Cabecalho exibirVidas />
      <main>
        <BarraProgresso valor={25} />
        <QuizSelecao
          tipo="video"
          titulo="Selecione o Correto"
          imagem={quiz.imagem}
          opcoes={quiz.opcoes.map((rotulo) => ({
            rotulo,
            imagem: quiz.imagem,
          }))}
          resposta={quiz.resposta}
          proxima="/modulos/alfabeto/quizzes/arraste-na-ordem"
        />
      </main>
    </>
  );
}
