import Link from "next/link";
import styles from "./page.module.css";

export default async function Header() {
  return (
    <header>
      headerheaderheaderheader
      <button>
        <Link href={`/blog`}>Блоги</Link>{" "}
      </button>
      <button>
        <Link href={`/`}>Главная</Link>
      </button>
    </header>
  );
}
