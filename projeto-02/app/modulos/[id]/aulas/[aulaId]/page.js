import PaginaAulaCliente from "@/components/PaginaAulaCliente";

export function generateStaticParams() {
  return [{ id: "alfabeto", aulaId: "introducao" }];
}

export default async function PaginaAula({ params }) {
  const { id } = await params;
  return <PaginaAulaCliente id={id} />;
}
