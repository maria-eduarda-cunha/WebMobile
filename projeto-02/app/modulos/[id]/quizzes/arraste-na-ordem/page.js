import BarraProgresso from "../../../../../components/BarraProgresso";
import Cabecalho from "../../../../../components/Cabecalho";
import QuizOrdem from "../../../../../components/QuizOrdem";
import conteudo from "../../../../../data/conteudos/alfabeto.json";

export default function PaginaQuizOrdem() {
  const quiz = conteudo.quizzes["arraste-na-ordem"];
  return (
    <>
      <Cabecalho exibirVidas />
      <main>
        <BarraProgresso valor={50} />
        <QuizOrdem imagem={conteudo.imagem} opcoes={quiz.opcoes} />
      </main>
    </>
  );
}
