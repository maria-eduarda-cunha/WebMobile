"use client";

import Link from "next/link";
import Cabecalho from "@/components/Cabecalho";
import EstadoApi from "@/components/EstadoApi";
import useApiData from "@/hooks/useApiData";

export default function PaginaModuloCliente({ id }) {
  const { data: modulo, error, loading } = useApiData(`/api/modulos/${id}`);

  return (
    <>
      <Cabecalho />
      <main>
        <EstadoApi loading={loading} error={error} />
        {modulo && (
          <section
            className="modulo"
            aria-label={`Opções do módulo ${modulo.titulo}`}
          >
            <article className="card">
              <Link href={`/modulos/${modulo.id}/aulas/introducao`}>
                <figure>
                  <span className="material-symbols-outlined icone">
                    school
                  </span>
                </figure>
                <h3>Aula</h3>
              </Link>
            </article>
            <article className="card">
              <Link href={`/modulos/${modulo.id}/quizzes/selecione-correto1`}>
                <figure>
                  <span className="material-symbols-outlined icone">quiz</span>
                </figure>
                <h3>Quiz</h3>
              </Link>
            </article>
          </section>
        )}
      </main>
    </>
  );
}
