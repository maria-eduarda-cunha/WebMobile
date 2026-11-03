import PaginaQuizOrdemCliente from "@/components/PaginaQuizOrdemCliente";

export async function generateStaticParams() {
  return [{ id: "alfabeto" }];
}

export default async function PaginaQuizOrdem({ params }) {
  const { id } = await params;
  return <PaginaQuizOrdemCliente id={id} />;
}
