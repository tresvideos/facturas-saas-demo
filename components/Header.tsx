'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Header(){
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-10">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="font-semibold text-brand-700 flex items-center gap-2">
          <span className="inline-block w-6 h-6 rounded bg-brand-600"></span> FacturaKit
        </Link>
        <nav className="flex items-center gap-5">
          <Link className={"nav-link " + (pathname?.startsWith('/plantillas') ? 'font-medium text-brand-700' : '')} href="/plantillas">Plantillas</Link>
          <Link className={"nav-link " + (pathname?.startsWith('/instrucciones') ? 'font-medium text-brand-700' : '')} href="/instrucciones">Instrucciones</Link>
          <Link className={"nav-link " + (pathname?.startsWith('/dashboard') ? 'font-medium text-brand-700' : '')} href="/dashboard">Panel</Link>
          {!session ? (
            <div className="flex gap-3">
              <Link href="/login" className="nav-link">Log in</Link>
              <Link href="/login" className="btn btn-primary">Sign up</Link>
            </div>
          ) : (
            <button onClick={()=>signOut({ callbackUrl: '/' })} className="nav-link">Salir</button>
          )}
        </nav>
      </div>
    </header>
  );
}
