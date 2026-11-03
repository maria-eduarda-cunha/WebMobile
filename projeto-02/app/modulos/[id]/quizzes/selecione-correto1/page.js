import PaginaQuizInicialCliente from "@/components/PaginaQuizInicialCliente";

export async function generateStaticParams() {
  return [{ id: "alfabeto" }];
}

export default async function PaginaQuizInicial({ params }) {
  const { id } = await params;
  return <PaginaQuizInicialCliente id={id} />;
}
