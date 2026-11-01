import Link from "next/link";

export default function CartaoModulo({ modulo }) {
  return (
    <article className="card-modulo">
      <Link href={`/modulos/${modulo.id}`} className="cartao-modulo">
        <figure>
          <span className="material-symbols-outlined icone">
            {modulo.icone}
          </span>
        </figure>
        <h3>{modulo.titulo}</h3>
      </Link>
    </article>
  );
}
