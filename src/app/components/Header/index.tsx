import Link from "next/link";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import Logout from "../Logout";

export default async function Header() {
  const sessionToken: string | undefined = (await cookies()).get(
    "session"
  )?.value;

  return (
    <header>
      <ul>
        <Link href={`/`}>Главная</Link>
        <Link href={`/blog`}>Блоги</Link>
        {sessionToken ? <Logout /> : <Link href={`auth/login`}>Вход</Link>}
      </ul>
    </header>
  );
}
