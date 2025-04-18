import styles from "./../page.module.css";
import { Metadata } from "next";
import Link from "next/link";

export default function User() {
  return (
    <div>
      <h1>Админка пользователя</h1>
      <div>{sessionToken}</div>

      <button>
        <Link href={`/login`}>Выход</Link>
      </button>
    </div>
  );
}
