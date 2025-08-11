'use client';
export const dynamic = 'force-dynamic';

import React, { Suspense, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, type Invoice, type Item } from '@/lib/store';
import { calcTotals } from '@/lib/calc';

function newId(){ return Math.random().toString(36).slice(2); }

function EditorInner(){
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
      seller: { name: sellerName, taxId: selle
