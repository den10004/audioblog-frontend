"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { authenticated } from "@/app/variables";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (status === authenticated) {
      const userEmail = session.user.user.email;
      setUser(userEmail);
    }
  }, [session]);

  console.log(user);

  return (
    <header>
      <ul>
        <Link href={`/`}>Главная</Link>&nbsp;&nbsp;
        <Link href={`/blog`}>Блоги</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {status != authenticated && <Link href={`/auth/login`}>Вход</Link>}
        &nbsp;&nbsp;
        {status === authenticated && <Link href={`/user`}>{user}</Link>}
        {status === authenticated && (
          <button onClick={() => signOut({ callbackUrl: "/" })}>Выход</button>
        )}
      </ul>
    </header>
  );
}
