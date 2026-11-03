import modulos from "@/data/modulos.json";

export async function GET(_request, { params }) {
  const { id } = await params;
  const modulo = modulos.find((item) => item.id === id);

  if (!modulo) {
    return Response.json({ error: "Módulo não encontrado." }, { status: 404 });
  }

  return Response.json(modulo);
}
