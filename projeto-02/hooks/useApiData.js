"use client";

import { useEffect, useState } from "react";

export default function useApiData(endpoint) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function carregarDados() {
      setLoading(true);
      setError("");
      setData(null);

      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        const resultado = await response.json();

        if (!response.ok) {
          throw new Error(
            resultado.error ||
              `Falha ao carregar os dados (${response.status}).`,
          );
        }

        setData(resultado);
      } catch (erro) {
        if (controller.signal.aborted) return;
        setError(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar os dados.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    carregarDados();

    return () => controller.abort();
  }, [endpoint]);

  return { data, error, loading };
}
