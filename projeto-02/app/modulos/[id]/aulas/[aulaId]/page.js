import Image from "next/image";
import Link from "next/link";
import Cabecalho from "../../../../../components/Cabecalho";
import conteudo from "../../../../../data/conteudos/alfabeto.json";

export function generateStaticParams() {
  return [{ id: "alfabeto", aulaId: "introducao" }];
}

export default async function PaginaAula({ params }) {
  const { id } = await params;
  return (
    <>
      <Cabecalho />
      <main>
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
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </Link>
        </article>
      </main>
    </>
  );
}
