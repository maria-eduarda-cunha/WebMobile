"use client";

import BarraProgresso from "@/components/BarraProgresso";
import Cabecalho from "@/components/Cabecalho";
import EstadoApi from "@/components/EstadoApi";
import QuizAssociacao from "@/components/QuizAssociacao";
import useApiData from "@/hooks/useApiData";

export default function PaginaQuizAssociacaoCliente({ id }) {
  const { data: conteudo, error, loading } = useApiData(`/api/conteudos/${id}`);
  const quiz = conteudo?.quizzes["arraste-aqui"];

  return (
    <>
      <Cabecalho exibirVidas />
      <main>
        <EstadoApi loading={loading} error={error} />
        {quiz && (
          <>
            <BarraProgresso valor={100} />
            <QuizAssociacao imagens={quiz.imagens} textos={quiz.textos} />
          </>
        )}
      </main>
    </>
  );
}
