import PaginaQuizAssociacaoCliente from "@/components/PaginaQuizAssociacaoCliente";

export async function generateStaticParams() {
  return [{ id: "alfabeto" }];
}

export default async function PaginaQuizAssociacao({ params }) {
  const { id } = await params;
  return <PaginaQuizAssociacaoCliente id={id} />;
}
