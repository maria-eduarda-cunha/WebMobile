import "./globals.css";

export const metadata = {
  title: "Duo Libras",
  description: "Aprenda Libras com aulas e quizzes interativos.",
};

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
