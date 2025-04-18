import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>Header</header>
      <main className={styles.main}>
        <h1>Основной сайт</h1>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}
