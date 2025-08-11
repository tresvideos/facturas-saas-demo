import Link from 'next/link';

function FakeInvoiceSVG(){
  return (
    <svg viewBox="0 0 600 380" className="w-full h-auto">
      <defs>
        <linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#a5b4fc"/><stop offset="1" stopColor="#818cf8"/></linearGradient>
      </defs>
      <rect x="0" y="0" width="600" height="380" rx="24" fill="white" stroke="#e5e7eb"/>
      <rect x="24" y="24" width="552" height="52" rx="12" fill="url(#g)"/>
      <rect x="36" y="36" width="220" height="16" rx="8" fill="#fff"/>
      <rect x="36" y="90" width="520" height="12" rx="6" fill="#e5e7eb"/>
      <rect x="36" y="112" width="520" height="12" rx="6" fill="#e5e7eb"/>
      <rect x="36" y="134" width="520" height="12" rx="6" fill="#e5e7eb"/>
      <rect x="36" y="310" width="200" height="14" rx="7" fill="#e5e7eb"/>
      <rect x="360" y="310" width="196" height="14" rx="7" fill="#6366f1"/>
    </svg>
  );
}

function Stars(){ return <div className="text-amber-500">★★★★★</div>; }
function Avatar({name}:{name:string}){
  const initials = name.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase();
  return <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs">{initials}</div>;
}

export default function Home(){
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600"></div>
            <span className="font-semibold text-brand-700">FacturaKit</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Facturas con tu <span className="text-brand-600">logo</span> y diseño en segundos
          </h1>
          <p className="mt-4 text-gray-600">
            Elige un diseño, sube tu logo y descarga el PDF listo para enviar.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/plantillas" className="btn btn-primary">Empezar ahora</Link>
            <Link href="/instrucciones" className="btn btn-ghost">Cómo funciona</Link>
          </div>
          <div className="mt-6 flex gap-4">
            <span className="badge">SSL</span>
            <span className="badge">Descargas seguras</span>
            <span className="badge">Soporte por email</span>
          </div>
        </div>
        <div className="card">
          <FakeInvoiceSVG/>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {[
          {q:'“En 3 minutos tenía la factura perfecta con mi logo.”', a:'Laura, diseñadora'},
          {q:'“Me encanta la variedad de diseños y lo fácil que es.”', a:'Carlos, freelance'},
          {q:'“PDF limpio y profesional para mis clientes.”', a:'Marta, agencia'}
        ].map((r,i)=> (
          <div key={i} className="card">
            <div className="flex items-center gap-2 mb-2"><Avatar name={r.a.split(',')[0]}/><div><div className="font-medium">{r.a.split(',')[0]}</div><div className="text-xs text-gray-500">{r.a.split(',')[1]}</div></div></div>
            <Stars/>
            <p className="text-gray-700 mt-2">{r.q}</p>
          </div>
        ))}
      </div>

      <div className="card mt-12">
        <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4 text-gray-700">
          <div>
            <h3 className="font-medium">¿Puedo usar mi propio logo?</h3>
            <p>Sí. Sube PNG/JPG desde el editor y se verá en el PDF.</p>
          </div>
          <div>
            <h3 className="font-medium">¿Cómo funciona el pago?</h3>
            <p>Primero un pago de 0,50€ para descargar, y si no cancelas en 48h se activa la suscripción mensual.</p>
          </div>
          <div>
            <h3 className="font-medium">¿Qué plantillas tenéis?</h3>
            <p>6 estilos listos (minimal, profesional, clásico, oscuro, etc.).</p>
          </div>
          <div>
            <h3 className="font-medium">¿Puedo editar mis facturas?</h3>
            <p>Sí. Desde el panel puedes previsualizar, editar, volver a descargar o eliminar.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
