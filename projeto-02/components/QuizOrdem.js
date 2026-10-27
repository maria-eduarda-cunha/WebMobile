"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function QuizOrdem({ imagem, opcoes }) {
  const [selecionadas, definirSelecionadas] = useState([]);
  const proxima = selecionadas.length + 1;
  const concluido = selecionadas.length === opcoes.length;

  function escolher(opcao) {
    if (opcao.ordem !== proxima) return;
    definirSelecionadas([...selecionadas, opcao.ordem]);
  }

  return (
    <section className="secao-quiz">
      <h2>Arraste na Ordem</h2>
      <section className="video-seta">
        <figure className="video">
          <Image
            src={imagem}
            alt="Demonstração de um sinal em Libras"
            width={900}
            height={550}
            unoptimized
          />
        </figure>
        <Link
          className={`seta ${concluido ? "liberada" : "bloqueada"}`}
          href="/modulos/alfabeto/quizzes/selecione-correto2"
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </Link>
      </section>
      <section className="area-drop">
        <p>Arraste as opções para cá</p>
        <p>
          {selecionadas
            .map(
              (ordem) => opcoes.find((opcao) => opcao.ordem === ordem).rotulo,
            )
            .join(" ")}
        </p>
      </section>
      <section className="opcoes">
        {opcoes.map((opcao) => (
          <button
            type="button"
            key={opcao.ordem}
            className={`opcao ${selecionadas.includes(opcao.ordem) ? "oculta" : ""}`}
            onClick={() => escolher(opcao)}
          >
            <p>{opcao.rotulo}</p>
          </button>
        ))}
      </section>
      <p className="mensagem">
        {concluido
          ? "Parabéns! Você colocou tudo na ordem correta!"
          : "Escolha a próxima opção."}
      </p>
    </section>
  );
}
