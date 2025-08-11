'use client';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login(){
  const { status } = useSession();
  const router = useRouter();
  useEffect(()=>{ if(status==='authenticated'){ router.push('/dashboard'); } },[status,router]);
  return (
    <div className="max-w-md mx-auto card text-center">
      <h1 className="text-2xl font-semibold mb-2">Acceder</h1>
      <p className="text-gray-600 mb-4">Usa tu cuenta de Google para continuar.</p>
      <button className="btn btn-primary w-full" onClick={()=>signIn('google', { callbackUrl: '/dashboard' })}>Continuar con Google</button>
      <p className="text-xs text-gray-500 mt-3">Al continuar aceptas los Términos y la Política de Privacidad.</p>
    </div>
  );
}
