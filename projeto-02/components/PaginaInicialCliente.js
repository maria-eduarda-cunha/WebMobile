"use client";

import Cabecalho from "@/components/Cabecalho";
import CartaoModulo from "@/components/CartaoModulo";
import EstadoApi from "@/components/EstadoApi";
import useApiData from "@/hooks/useApiData";

export default function PaginaInicialCliente() {
  const { data: modulos, error, loading } = useApiData("/api/modulos");

  return (
    <>
      <Cabecalho />
      <main>
        <EstadoApi loading={loading} error={error} />
        {modulos && (
          <section
            className="secao-modulos"
            aria-label="Módulos de aprendizagem"
          >
            {modulos.map((modulo) => (
              <CartaoModulo key={modulo.id} modulo={modulo} />
            ))}
          </section>
        )}
      </main>
    </>
  );
}
