"use client";

import Image from "next/image";
import Link from "next/link";
import Cabecalho from "@/components/Cabecalho";
import EstadoApi from "@/components/EstadoApi";
import useApiData from "@/hooks/useApiData";

export default function PaginaAulaCliente({ id }) {
  const { data: conteudo, error, loading } = useApiData(`/api/conteudos/${id}`);

  return (
    <>
      <Cabecalho />
      <main>
        <EstadoApi loading={loading} error={error} />
        {conteudo && (
          <>
            <h1 className="titulo-aula">Aula (vídeo)</h1>
            <article className="container-aula">
              <figure className="video">
                <Image
                  src={conteudo.imagem}
                  alt="Gif realizando o sinal de Libras na Língua Brasileira de Sinais"
                  width={900}
                  height={550}
                  unoptimized
                />
              </figure>
              <Link href={`/modulos/${id}`} aria-label="Voltar ao módulo">
                <span className="material-symbols-outlined">
                  arrow_forward_ios
                </span>
              </Link>
            </article>
          </>
        )}
      </main>
    </>
  );
}
