'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header(){
  const pathname = usePathname();
  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="font-semibold">Facturas Demo</Link>
        <nav className="flex gap-4 text-sm">
          <Link className={pathname?.startsWith('/plantillas') ? 'font-medium' : ''} href="/plantillas">Plantillas</Link>
          <Link className={pathname?.startsWith('/editor') ? 'font-medium' : ''} href="/editor">Editor</Link>
          <Link className={pathname?.startsWith('/dashboard') ? 'font-medium' : ''} href="/dashboard">Panel</Link>
        </nav>
      </div>
    </header>
  );
}
