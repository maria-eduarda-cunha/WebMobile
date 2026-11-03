import PaginaModuloCliente from "@/components/PaginaModuloCliente";
import modulos from "@/data/modulos.json";

export function generateStaticParams() {
  return modulos.map(({ id }) => ({ id }));
}

export default async function PaginaModulo({ params }) {
  const { id } = await params;
  return <PaginaModuloCliente id={id} />;
}
