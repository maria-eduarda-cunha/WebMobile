import modulos from "@/data/modulos.json";

export async function GET() {
  return Response.json(modulos);
}
