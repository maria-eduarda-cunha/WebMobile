"use client";

import BarraProgresso from "@/components/BarraProgresso";
import Cabecalho from "@/components/Cabecalho";
import EstadoApi from "@/components/EstadoApi";
import QuizSelecao from "@/components/QuizSelecao";
import useApiData from "@/hooks/useApiData";

export default function PaginaQuizInicialCliente({ id }) {
  const { data: conteudo, error, loading } = useApiData(`/api/conteudos/${id}`);
  const quiz = conteudo?.quizzes["selecione-correto1"];

  return (
    <>
      <Cabecalho exibirVidas />
      <main>
        <EstadoApi loading={loading} error={error} />
        {quiz && (
          <>
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
              proxima={`/modulos/${id}/quizzes/arraste-na-ordem`}
            />
          </>
        )}
      </main>
    </>
  );
}
