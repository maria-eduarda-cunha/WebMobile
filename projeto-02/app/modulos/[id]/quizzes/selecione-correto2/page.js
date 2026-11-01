import BarraProgresso from "../../../../../components/BarraProgresso";
import Cabecalho from "../../../../../components/Cabecalho";
import QuizSelecao from "../../../../../components/QuizSelecao";
import conteudo from "../../../../../data/conteudos/alfabeto.json";

export default function PaginaQuizMidia() {
  const quiz = conteudo.quizzes["selecione-correto2"];
  return (
    <>
      <Cabecalho exibirVidas />
      <main>
        <BarraProgresso valor={75} />
        <QuizSelecao
          tipo="video"
          titulo="Selecione o Correto"
          imagem={conteudo.imagem}
          opcoes={quiz.opcoes}
          resposta={quiz.resposta}
          proxima="/modulos/alfabeto/quizzes/arraste-aqui"
        />
      </main>
    </>
  );
}
