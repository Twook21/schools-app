import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Tipe session user 
type ExtendedUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

export const useAuth = (requiredRole: string | null = null, redirectTo: string = '/auth/login') => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session || !session.user) {
      router.push(redirectTo);
      return;
    }

    // validasi role
    const userRole = (session.user as ExtendedUser).role;
    if (requiredRole && userRole !== requiredRole) {
      router.push('/unauthorized'); 
    }
  }, [session, status, router, requiredRole, redirectTo]);

  return { session, status };
};