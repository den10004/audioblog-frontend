"use client";
import styles from "./../page.module.css";
import Cookies from "js-cookie";
import Link from "next/link";

export default function User() {
  const sessionCookieValue = Cookies.get("session");

  return (
    <div>
      <h1>Админка пользователя</h1>

      <div>{sessionCookieValue}</div>

      <button>
        <Link href={`/login`}>Выход</Link>
      </button>

      <div>
        <span>Регистрация</span>
      </div>
    </div>
  );
}
