'use client';
import { useApp } from '@/lib/store';
import Link from 'next/link';

export default function Dashboard(){
  const { invoices, markPaid, removeInvoice } = useApp();

  async function download(id: string){
    const inv = invoices.find(i=>i.id===id);
    if(!inv) return;
    if(!inv.paid050){
      const ok = confirm('Demo de pago: se simulará un cobro de 0,50€ y luego podrás descargar. ¿Continuar?');
      if(!ok) return;
      markPaid(id);
      alert('Pago demo realizado. (No es un cobro real)');
    }
    const res = await fetch('/api/pdf', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(inv)});
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${inv.number}.pdf`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Mi Panel</h1>
        <Link href="/plantillas" className="btn btn-primary">Crear nueva factura</Link>
      </div>
      {invoices.length===0 ? (
        <div className="card">
          <p className="text-gray-600">Aún no tienes facturas. Crea la primera desde «Plantillas».</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Número</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv=> (
                <tr key={inv.id} className="border-b last:border-0">
                  <td className="py-2">{inv.number}</td>
                  <td>{inv.buyer.name}</td>
                  <td>{inv.total.toFixed(2)} €</td>
                  <td>{inv.paid050 ? 'Pagada 0,50€ (demo)' : 'Pendiente de pago'}</td>
                  <td className="text-right space-x-2">
                    <button className="btn btn-ghost" onClick={()=>download(inv.id)}>Descargar PDF</button>
                    <button className="btn btn-ghost" onClick={()=>removeInvoice(inv.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6 card">
        <h2 className="font-medium mb-2">Suscripción (demo)</h2>
        <p className="text-sm text-gray-600">Aquí iría el estado de tu plan, método de pago y botón de cancelar. En esta demo aún no hay pasarela.</p>
      </div>
    </div>
  );
}
