"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { authenticated } from "@/app/variables";

export default function Header() {
  const { status } = useSession();

  return (
    <header>
      <ul>
        <Link href={`/`}>Главная</Link>
        <Link href={`/blog`}>Блоги</Link>
        {status != authenticated && <Link href={`/auth/login`}>Вход</Link>}
      </ul>
    </header>
  );
}
