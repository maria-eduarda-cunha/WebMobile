import Cabecalho from "../components/Cabecalho";
import CartaoModulo from "../components/CartaoModulo";
import modulos from "../data/modulos.json";

export default function PaginaInicial() {
  return (
    <>
      <Cabecalho />
      <main>
        <section className="secao-modulos" aria-label="Módulos de aprendizagem">
          {modulos.map((modulo) => (
            <CartaoModulo key={modulo.id} modulo={modulo} />
          ))}
        </section>
      </main>
    </>
  );
}
