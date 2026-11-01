import BarraProgresso from "../../../../../components/BarraProgresso";
import Cabecalho from "../../../../../components/Cabecalho";
import QuizAssociacao from "../../../../../components/QuizAssociacao";
import conteudo from "../../../../../data/conteudos/alfabeto.json";

export default function PaginaQuizAssociacao() {
  const quiz = conteudo.quizzes["arraste-aqui"];
  return (
    <>
      <Cabecalho exibirVidas />
      <main>
        <BarraProgresso valor={100} />
        <QuizAssociacao imagens={quiz.imagens} textos={quiz.textos} />
      </main>
    </>
  );
}
