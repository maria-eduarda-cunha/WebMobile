export default function EstadoApi({ loading, error }) {
  if (loading) {
    return <output>Carregando conteúdo...</output>;
  }

  if (error) {
    return <p role="alert">Não foi possível carregar o conteúdo: {error}</p>;
  }

  return null;
}
