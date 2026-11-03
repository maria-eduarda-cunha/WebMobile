"use client";

import BarraProgresso from "@/components/BarraProgresso";
import Cabecalho from "@/components/Cabecalho";
import EstadoApi from "@/components/EstadoApi";
import QuizOrdem from "@/components/QuizOrdem";
import useApiData from "@/hooks/useApiData";

export default function PaginaQuizOrdemCliente({ id }) {
  const { data: conteudo, error, loading } = useApiData(`/api/conteudos/${id}`);
  const quiz = conteudo?.quizzes["arraste-na-ordem"];

  return (
    <>
      <Cabecalho exibirVidas />
      <main>
        <EstadoApi loading={loading} error={error} />
        {quiz && (
          <>
            <BarraProgresso valor={50} />
            <QuizOrdem
              imagem={conteudo.imagem}
              opcoes={quiz.opcoes}
              proxima={`/modulos/${id}/quizzes/selecione-correto2`}
            />
          </>
        )}
      </main>
    </>
  );
}
