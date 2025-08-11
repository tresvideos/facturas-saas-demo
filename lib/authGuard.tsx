'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useRequireAuth(){
  const { status } = useSession();
  const router = useRouter();
  useEffect(()=>{
    if(status === 'unauthenticated'){
      router.push('/login');
    }
  },[status, router]);
  return status === 'authenticated';
}
