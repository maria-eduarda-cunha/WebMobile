import Link from "next/link";
import Cabecalho from "../../../components/Cabecalho";
import modulos from "../../../data/modulos.json";

export function generateStaticParams() {
  return modulos.map(({ id }) => ({ id }));
}

export default async function PaginaModulo({ params }) {
  const { id } = await params;
  const modulo = modulos.find((item) => item.id === id) || modulos[0];

  return (
    <>
      <Cabecalho />
      <main>
        <section
          className="modulo"
          aria-label={`Opções do módulo ${modulo.titulo}`}
        >
          <article className="card">
            <Link href={`/modulos/${modulo.id}/aulas/introducao`}>
              <figure>
                <span className="material-symbols-outlined icone">school</span>
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
      </main>
    </>
  );
}
