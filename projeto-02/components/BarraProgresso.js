export default function BarraProgresso({ valor }) {
  return (
    <progress value={valor} max="100">
      {valor}%
    </progress>
  );
}
