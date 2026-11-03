import alfabeto from "@/data/conteudos/alfabeto.json";

const conteudos = { alfabeto };

export async function GET(_request, { params }) {
  const { id } = await params;
  const conteudo = Object.hasOwn(conteudos, id) ? conteudos[id] : null;

  if (!conteudo) {
    return Response.json(
      { error: "Conteúdo deste módulo não encontrado." },
      { status: 404 },
    );
  }

  return Response.json(conteudo);
}
