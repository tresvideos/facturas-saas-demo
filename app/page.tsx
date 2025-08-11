import Link from 'next/link';

export default function Home(){
  return (
    <section>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-brand-600"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Facturas con tu <span className="text-brand-600">logo</span> y diseño en segundos
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Elige un diseño, sube tu logo, completa los datos y descarga el PDF listo para enviar.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link href="/plantillas" className="btn btn-primary">Empezar ahora</Link>
          <Link href="/instrucciones" className="btn btn-ghost">Cómo funciona</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="card">
          <h3 className="font-medium">Añade tu logo</h3>
          <p className="text-sm text-gray-600 mt-2">Sube PNG/JPG y aparecerá en tus PDFs.</p>
        </div>
        <div className="card">
          <h3 className="font-medium">Todos tus datos</h3>
          <p className="text-sm text-gray-600 mt-2">Email, teléfono, web, IBAN, notas y más.</p>
        </div>
        <div className="card">
          <h3 className="font-medium">6 estilos</h3>
          <p className="text-sm text-gray-600 mt-2">Minimal, profesional, clásico, oscuro, etc.</p>
        </div>
      </div>

      <div className="card mt-12">
        <h2 className="text-2xl font-semibold">Opiniones</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div><p className="text-gray-700">“En 3 minutos tenía la factura lista con mi logo.”</p><p className="text-sm text-gray-500 mt-2">— Laura, diseñadora</p></div>
          <div><p className="text-gray-700">“Plantillas bonitas y claras. Lo uso cada semana.”</p><p className="text-sm text-gray-500 mt-2">— Carlos, freelance</p></div>
          <div><p className="text-gray-700">“PDF perfecto para enviar a mis clientes.”</p><p className="text-sm text-gray-500 mt-2">— Marta, agencia</p></div>
        </div>
        <div className="flex gap-4 mt-6">
          <span className="badge">SSL</span>
          <span className="badge">Descargas seguras</span>
          <span className="badge">Soporte por email</span>
        </div>
      </div>
    </section>
  );
}
