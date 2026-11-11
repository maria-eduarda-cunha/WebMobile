
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function QuizAssociacao({ imagens, textos }) {
  const [selecionado, definirSelecionado] = useState(null);
  const [associacoes, definirAssociacoes] = useState({});
  const [feedback, definirFeedback] = useState(null);

  const concluidas = textos.every(
    (texto) => associacoes[texto.id]
  );

  const textosAssociados = Object.keys(associacoes);
  const imagensAssociadas = Object.values(associacoes);

  function selecionar(tipo, id) {
    if (tipo === "texto" && textosAssociados.includes(id)) return;
    if (tipo === "imagem" && imagensAssociadas.includes(id)) return;

    if (!selecionado) {
      definirSelecionado({ tipo, id });
      definirFeedback(null);
      return;
    }

    if (selecionado.tipo === tipo) {
      definirSelecionado({ tipo, id });
      definirFeedback(null);
      return;
    }

    const textoId = tipo === "texto" ? id : selecionado.id;
    const imagemId = tipo === "imagem" ? id : selecionado.id;

    const texto = textos.find((item) => item.id === textoId);

    if (texto && texto.resposta === imagemId) {
      definirAssociacoes((anterior) => ({
        ...anterior,
        [textoId]: imagemId
      }));

      definirFeedback(null);
    } else {
      definirFeedback({
        tipo: "erro",
        mensagem: "Ops! Associação incorreta. Tente novamente!"
      });
    }

    definirSelecionado(null);
  }

  return (
    <section className="secao-quiz">
      <h2>Relacione os textos e os vídeos corretamente</h2>

      <section className="questao">

        {/* TEXTOS */}
        <section className="container-texto">
          {textos.map((texto) => {
            const associado = textosAssociados.includes(texto.id);

            const ativo =
              selecionado?.tipo === "texto" &&
              selecionado.id === texto.id;

            return (
              <article
                key={texto.id}
                onClick={() => selecionar("texto", texto.id)}
                className={`
                  ${ativo ? "selecionado" : ""}
                  ${associado ? "correto" : ""}
                `}
                style={{
                  cursor: associado ? "default" : "pointer"
                }}
                aria-disabled={associado}
              >
                <p>
                  {texto.rotulo}
                  {associado && " ✓"}
                </p>
              </article>
            );
          })}
        </section>

        {/* GIFS - ESTRUTURA ORIGINAL PRESERVADA */}
        <section className="container-video">
          {imagens.map((imagem) => {
            const associado = imagensAssociadas.includes(imagem.id);

            const ativo =
              selecionado?.tipo === "imagem" &&
              selecionado.id === imagem.id;

            return (
              <article
                key={imagem.id}
                onClick={() => selecionar("imagem", imagem.id)}
                className={`
                  ${ativo ? "selecionado" : ""}
                  ${associado ? "correto" : ""}
                `}
                style={{
                  cursor: associado ? "default" : "pointer"
                }}
                aria-disabled={associado}
              >
                <figure className="video">
                  <Image
                    src={imagem.url}
                    alt={`Sinal de ${imagem.rotulo}`}
                    width={300}
                    height={160}
                    unoptimized
                  />
                </figure>

                <p>
                  {associado
                    ? "✓ Correto!"
                    : imagem.rotulo}
                </p>
              </article>
            );
          })}
        </section>

        {/* FEEDBACK */}
        {feedback && (
          <p
            role="status"
            aria-live="polite"
            className={`feedback-associacao ${feedback.tipo}`}
          >
            {feedback.mensagem}
          </p>
        )}

        {/* CONCLUSÃO */}
        {concluidas && (
          <p className="mensagem-conclusao">
            🎉 Parabéns! Você relacionou todas as opções corretamente!
          </p>
        )}

        {/* CONTINUAR */}
        <Link
          className={`seta ${concluidas ? "liberada" : "bloqueada"}`}
          href="/"
          aria-disabled={!concluidas}
          onClick={(evento) => {
            if (!concluidas) evento.preventDefault();
          }}
          aria-label="Continuar"
        >
          <span className="material-symbols-outlined">
            arrow_forward_ios
          </span>
        </Link>

      </section>
    </section>
  );
}
