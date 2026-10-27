"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function QuizAssociacao({ imagens, textos }) {
  const [associacoes, definirAssociacoes] = useState({});
  const [arrastado, definirArrastado] = useState(null);
  const concluido = Object.keys(associacoes).length === textos.length;

  function soltar(idImagem) {
    if (!arrastado) return;
    definirAssociacoes({ ...associacoes, [idImagem]: arrastado });
    definirArrastado(null);
  }

  return (
    <section className="secao-quiz">
      <h2>Relacione os textos e os vídeos corretamente</h2>
      <section className="questao">
        <section className="container-texto">
          {textos.map((texto) => (
            <article
              key={texto.id}
              draggable
              onDragStart={() => definirArrastado(texto.id)}
            >
              <p>{texto.rotulo}</p>
            </article>
          ))}
        </section>
        <section className="container-video">
          {imagens.map((imagem) => (
            <article key={imagem.id}>
              <figure className="video">
                <Image
                  src={imagem.url}
                  alt={`Sinal de ${imagem.rotulo}`}
                  width={300}
                  height={160}
                  unoptimized
                />
              </figure>
              <p
                onDragOver={(evento) => evento.preventDefault()}
                onDrop={() => soltar(imagem.id)}
              >
                {associacoes[imagem.id] || "Arraste aqui"}
              </p>
            </article>
          ))}
        </section>
        <Link
          className={`seta ${concluido ? "liberada" : "bloqueada"}`}
          href="/"
          aria-label="Voltar para o início"
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </Link>
      </section>
    </section>
  );
}
