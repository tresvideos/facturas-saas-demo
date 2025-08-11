'use client';
import Sidebar from '@/components/Sidebar';

export default function Suscripcion(){
  return (
    <div className="grid grid-cols-4 gap-6">
      <Sidebar/>
      <div className="col-span-3">
        <div className="card">
          <h1 className="text-2xl font-semibold mb-2">Mi suscripción</h1>
          <p className="text-gray-600">Demo: aquí irán el estado del plan, próximo cargo, método de pago y botón de cancelar.</p>
        </div>
      </div>
    </div>
  );
}
