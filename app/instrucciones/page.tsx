export default function Instrucciones(){
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h1 className="text-3xl font-semibold mb-4">Cómo crear tu factura</h1>
        <ol className="list-decimal ml-6 space-y-2 text-gray-700">
          <li>Ve a <strong>Plantillas</strong> y elige un diseño.</li>
          <li>En el editor, sube tu <strong>logo</strong> y completa tus datos.</li>
          <li>Añade los <strong>conceptos</strong> y revisa los totales.</li>
          <li>Guarda y descarga el <strong>PDF</strong> desde tu panel.</li>
        </ol>
      </div>
      <div className="card">
        <h2 className="text-xl font-medium mb-2">Consejos</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Usa un logo en PNG con fondo transparente para mejor resultado.</li>
          <li>Comprueba el <strong>número de factura</strong> sigue tu serie.</li>
          <li>Añade tu <strong>IBAN</strong> si aceptas transferencia.</li>
          <li>Incluye <strong>notas</strong> con condiciones de pago o agradecimientos.</li>
        </ul>
      </div>
    </div>
  );
}
