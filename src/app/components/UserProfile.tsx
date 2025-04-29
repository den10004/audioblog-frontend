"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
    };
  }
}

function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}

type User = {
  id: string;
  name: string;
  email?: string;
};

export default function UserProfile() {
  const {
    user,
    loading,
    error,
  }: {
    user?: User | null;
    loading: boolean;
    error: Error | null;
  } = useUser();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return <>{user?.email}</>;
}
