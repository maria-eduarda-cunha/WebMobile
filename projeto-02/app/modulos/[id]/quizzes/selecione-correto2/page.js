import PaginaQuizMidiaCliente from "@/components/PaginaQuizMidiaCliente";

export async function generateStaticParams() {
  return [{ id: "alfabeto" }];
}

export default async function PaginaQuizMidia({ params }) {
  const { id } = await params;
  return <PaginaQuizMidiaCliente id={id} />;
}
