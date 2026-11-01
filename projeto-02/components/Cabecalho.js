import Image from "next/image";
import Link from "next/link";

export default function Cabecalho({ exibirVidas = false }) {
  return (
    <header className="cabecalho">
      <Link href="/" aria-label="Página inicial do Duo Libras">
        <Image
          src="/img/logo.png"
          alt="Logo do Duo Libras"
          className="logo"
          width={130}
          height={52}
          priority
        />
      </Link>
      <nav className="menu" aria-label="Menu">
        {exibirVidas && (
          <span className="vidas">
            <span className="material-symbols-outlined coracao">favorite</span>
            <span className="material-symbols-outlined coracao">favorite</span>
            <span className="material-symbols-outlined coracao">favorite</span>
          </span>
        )}
        <span className="material-symbols-outlined icone" aria-hidden="true">
          local_fire_department
        </span>
        <span className="material-symbols-outlined icone" aria-hidden="true">
          account_circle
        </span>
      </nav>
    </header>
  );
}
