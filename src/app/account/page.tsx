"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const router = useRouter();
  const { data: session } = useSession() as {
    data: {
      user: {
        user: any;
        email: string;
        role: string;
      };
    } | null;
  };

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const userEmail: string = session.user.user?.email;
  const userRole: string = session.user.user?.role;
  return (
    <div>
      <div>
        <h1>Пользователь {userEmail}</h1>
        <p>Роль {userRole}</p>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Выход</button>
      </div>
    </div>
  );
}
