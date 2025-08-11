'use client';
import { create } from 'zustand';

export type Item = { description: string; qty: number; price: number; tax: number };
export type Invoice = {
  id: string;
  number: string;
  title: string;
  seller: { name: string; taxId: string; address?: string };
  buyer: { name: string; address?: string };
  items: Item[];
  subtotal: number;
  taxTotal: number;
  total: number;
  createdAt: string;
  paid050: boolean;
};

type State = {
  user: { id: string; name: string } | null;
  invoices: Invoice[];
  setUser: (u: State['user']) => void;
  saveInvoice: (inv: Invoice) => void;
  markPaid: (id: string) => void;
  removeInvoice: (id: string) => void;
};

const key = 'fsd-state-v1';

function load(){
  if(typeof window === 'undefined') return {user:null,invoices:[]};
  try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; }
}

export const useApp = create<State>((set,get)=> ({
  user: load().user || { id: 'demo', name: 'Demo' },
  invoices: load().invoices || [],
  setUser(u){
    set({ user: u });
    if(typeof window !== 'undefined'){
      const s = { ...load(), user: u };
      localStorage.setItem(key, JSON.stringify(s));
    }
  },
  saveInvoice(inv){
    const list = [...get().invoices];
    const i = list.findIndex(x=>x.id===inv.id);
    if(i>=0) list[i]=inv; else list.unshift(inv);
    set({ invoices: list });
    if(typeof window !== 'undefined'){
      const s = { ...load(), invoices: list };
      localStorage.setItem(key, JSON.stringify(s));
    }
  },
  markPaid(id){
    const list = get().invoices.map(i => i.id===id ? {...i, paid050: true} : i);
    set({ invoices: list });
    if(typeof window !== 'undefined'){
      const s = { ...load(), invoices: list };
      localStorage.setItem(key, JSON.stringify(s));
    }
  },
  removeInvoice(id){
    const list = get().invoices.filter(i=>i.id!==id);
    set({ invoices: list });
    if(typeof window !== 'undefined'){
      const s = { ...load(), invoices: list };
      localStorage.setItem(key, JSON.stringify(s));
    }
  }
}));
