import Link from "next/link";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function Header() {
  const sessionToken = cookies().get("session")?.value;

  const Logout = () => {
    cookies().delete({
      name: "session",
      path: "/",
      domain: "example.com",
    });
  };

  return (
    <header>
      <ul>
        <Link href={`/`}>Главная</Link>
        <Link href={`/blog`}>Блоги</Link>
        {sessionToken ? (
          <Link href={`/`}>Выход</Link>
        ) : (
          <Link href={`/login`}>Вход</Link>
        )}
      </ul>
    </header>
  );
}
