"use client";

import BarraProgresso from "@/components/BarraProgresso";
import Cabecalho from "@/components/Cabecalho";
import EstadoApi from "@/components/EstadoApi";
import QuizSelecao from "@/components/QuizSelecao";
import useApiData from "@/hooks/useApiData";

export default function PaginaQuizMidiaCliente({ id }) {
  const { data: conteudo, error, loading } = useApiData(`/api/conteudos/${id}`);
  const quiz = conteudo?.quizzes["selecione-correto2"];

  return (
    <>
      <Cabecalho exibirVidas />
      <main>
        <EstadoApi loading={loading} error={error} />
        {quiz && (
          <>
            <BarraProgresso valor={75} />
            <QuizSelecao
              tipo="video"
              titulo="Selecione o Correto"
              imagem={conteudo.imagem}
              opcoes={quiz.opcoes}
              resposta={quiz.resposta}
              proxima={`/modulos/${id}/quizzes/arraste-aqui`}
            />
          </>
        )}
      </main>
    </>
  );
}
