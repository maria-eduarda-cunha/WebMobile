"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function QuizSelecao({
  tipo,
  proxima,
  titulo,
  imagem,
  opcoes,
  resposta,
}) {
  const [selecionada, definirSelecionada] = useState(null);

  function selecionar(opcao) {
    if (selecionada === resposta || selecionada === opcao) return;
    definirSelecionada(opcao);
  }

  return (
    <section className="secao-quiz">
      <h2>{titulo}</h2>
      <section className={tipo === "video" ? "video-seta" : "questao"}>
        {tipo === "video" ? (
          <figure className="video">
            <Image
              src={imagem}
              alt="Demonstração de um sinal em Libras"
              width={900}
              height={550}
              unoptimized
            />
          </figure>
        ) : (
          <p>Texto contendo a pergunta</p>
        )}
        <Link
          className={`seta ${selecionada === resposta ? "liberada" : "bloqueada"}`}
          href={selecionada === resposta ? proxima : "#"}
          aria-disabled={selecionada !== resposta}
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </Link>
      </section>
      <section className={tipo === "video" ? "opcoes" : "opcoes opcoes-texto"}>
        {opcoes.map((opcao) => (
          <button
            type="button"
            className={`opcao ${
              selecionada === opcao
                ? opcao === resposta
                  ? "correta"
                  : "errada"
                : ""
            }`}
            key={opcao}
            onClick={() => selecionar(opcao)}
            onKeyDown={(evento) => evento.key === "Enter" && selecionar(opcao)}
          >
            {tipo === "video" ? (
              <figure className="video">
                <Image
                  src={opcao.imagem}
                  alt={opcao.rotulo}
                  width={300}
                  height={160}
                  unoptimized
                />
              </figure>
            ) : (
              <p>{opcao}</p>
            )}
          </button>
        ))}
      </section>
    </section>
  );
}
