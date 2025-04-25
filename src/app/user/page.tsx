"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

declare module "next-auth" {
  interface Session {
    user: {
      user: any;
      email: string;
      role: string;
    };
  }
}

export default function UserPage() {
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/auth/login";
    },
  });

  useEffect(() => {
    if (!status) {
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
      </div>
    </div>
  );
}
