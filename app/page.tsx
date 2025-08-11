import Link from 'next/link';

export default function Home(){
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h1 className="text-3xl font-semibold mb-2">Plantillas de Facturas</h1>
        <p className="text-gray-600 mb-4">Rellena tus datos, previsualiza y descarga el PDF. Demo sin pagos reales.</p>
        <div className="flex gap-3">
          <Link href="/plantillas" className="btn btn-primary">Ver plantillas</Link>
          <Link href="/dashboard" className="btn btn-ghost">Mi Panel</Link>
        </div>
        <ul className="mt-6 space-y-2 text-sm text-gray-700">
          <li>• Editor con vista previa</li>
          <li>• Descarga PDF (pago demo 0,50€)</li>
          <li>• Panel con tus facturas</li>
        </ul>
      </div>
      <div className="card">
        <h2 className="text-xl font-medium mb-3">Cómo funciona</h2>
        <ol className="list-decimal ml-5 space-y-2 text-gray-700">
          <li>Elige una plantilla</li>
          <li>Rellena el formulario</li>
          <li>Guarda y descarga el PDF</li>
        </ol>
        <p className="text-xs text-gray-500 mt-4">* Esta demo guarda tus datos en tu navegador (localStorage).</p>
      </div>
    </div>
  );
}
