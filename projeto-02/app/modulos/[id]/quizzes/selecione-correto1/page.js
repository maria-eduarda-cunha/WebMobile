import { Suspense } from "react";
import PaginaQuizInicialCliente from "@/components/PaginaQuizInicialCliente";

export async function generateStaticParams() {
  return [{ id: "alfabeto" }];
}

async function ConteudoQuiz({ params }) {
  const { id } = await params;

  return <PaginaQuizInicialCliente id={id} />;
}

export default function PaginaQuizInicial({ params }) {
  return (
    <Suspense fallback={<p>Carregando quiz...</p>}>
      <ConteudoQuiz params={params} />
    </Suspense>
  );
}