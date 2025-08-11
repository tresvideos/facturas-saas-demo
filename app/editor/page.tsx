
'use client';
export const dynamic = 'force-dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useApp, type Invoice, type Item } from '@/lib/store';
import { calcTotals } from '@/lib/calc';
import Link from 'next/link';

function newId(){ return Math.random().toString(36).slice(2); }

export default function EditorPage(){
  const params = useSearchParams();
  const router = useRouter();
  const tpl = params.get('tpl') || 'estandar-iva-21';
  const { saveInvoice } = useApp();

  const [title, setTitle] = useState('Factura estándar');
  const [number, setNumber] = useState('F-0001');
  const [sellerName, setSellerName] = useState('Mi Empresa SL');
  const [sellerTax, setSellerTax] = useState('B12345678');
  const [sellerAddr, setSellerAddr] = useState('C/ Ejemplo 123, Barcelona');
  const [buyerName, setBuyerName] = useState('Cliente Ejemplo');
  const [buyerAddr, setBuyerAddr] = useState('C/ Cliente 99, Madrid');
  const [items, setItems] = useState<Item[]>([{ description:'Servicio', qty:1, price:100, tax:21 }]);

  const totals = useMemo(()=>calcTotals(items),[items]);

  function setItem(i:number, patch: Partial<Item>){
    setItems(prev => prev.map((it,idx)=> idx===i ? {...it, ...patch} : it));
  }
  function addItem(){ setItems(prev=> [...prev, { description:'', qty:1, price:0, tax:21 }]); }
  function delItem(i:number){ setItems(prev => prev.filter((_,idx)=> idx!==i)); }

  function handleSave(){
    const inv: Invoice = {
      id: newId(),
      number, title,
      seller: { name: sellerName, taxId: sellerTax, address: sellerAddr },
      buyer: { name: buyerName, address: buyerAddr },
      items, ...totals,
      createdAt: new Date().toISOString(),
      paid050: false
    };
    saveInvoice(inv);
    router.push(`/dashboard`);
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="card">
        <h1 className="text-xl font-semibold mb-4">Editor — {tpl}</h1>
        <div className="grid grid-cols-2 gap-3">
          <label className="label col-span-2">Título<input className="input" value={title} onChange={e=>setTitle(e.target.value)}/></label>
          <label className="label">Número<input className="input" value={number} onChange={e=>setNumber(e.target.value)}/></label>
        </div>
        <div className="mt-4">
          <h2 className="font-medium mb-2">Emisor</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="label">Nombre<input className="input" value={sellerName} onChange={e=>setSellerName(e.target.value)}/></label>
            <label className="label">CIF/NIF<input className="input" value={sellerTax} onChange={e=>setSellerTax(e.target.value)}/></label>
            <label className="label col-span-2">Dirección<input className="input" value={sellerAddr} onChange={e=>setSellerAddr(e.target.value)}/></label>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-medium mb-2">Cliente</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="label col-span-2">Nombre<input className="input" value={buyerName} onChange={e=>setBuyerName(e.target.value)}/></label>
            <label className="label col-span-2">Dirección<input className="input" value={buyerAddr} onChange={e=>setBuyerAddr(e.target.value)}/></label>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-medium mb-2">Conceptos</h2>
          <div className="space-y-3">
            {items.map((it, i)=> (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-6">
                  <label className="label">Descripción<input className="input" value={it.description} onChange={e=>setItem(i,{description:e.target.value})}/></label>
                </div>
                <div className="col-span-2">
                  <label className="label">Cant.<input type="number" className="input" value={it.qty} onChange={e=>setItem(i,{qty:+e.target.value})}/></label>
                </div>
                <div className="col-span-2">
                  <label className="label">Precio<input type="number" className="input" value={it.price} onChange={e=>setItem(i,{price:+e.target.value})}/></label>
                </div>
                <div className="col-span-2">
                  <label className="label">% IVA<input type="number" className="input" value={it.tax} onChange={e=>setItem(i,{tax:+e.target.value})}/></label>
                </div>
                <button onClick={()=>delItem(i)} className="justify-self-end text-sm text-red-600">Eliminar</button>
              </div>
            ))}
            <button className="btn btn-ghost" onClick={addItem}>+ Añadir concepto</button>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary" onClick={handleSave}>Guardar en mi panel</button>
          <Link className="btn btn-ghost" href="/dashboard">Volver</Link>
        </div>
      </div>
      <div className="card">
        <h2 className="font-medium mb-2">Resumen</h2>
        <div className="text-sm space-y-1">
          <div>Subtotal: <strong>{totals.subtotal.toFixed(2)} €</strong></div>
          <div>IVA: <strong>{totals.taxTotal.toFixed(2)} €</strong></div>
          <div>Total: <strong>{totals.total.toFixed(2)} €</strong></div>
        </div>
        <p className="text-xs text-gray-500 mt-4">* La descarga de PDF se realiza desde el panel y requiere pago demo (no real).</p>
      </div>
    </div>
  );
}
