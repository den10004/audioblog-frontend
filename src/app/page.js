import Image from "next/image";
import styles from "./page.module.css";

export default async function Home() {
  const blogs = await fetch(`${process.env.NEXT_PUBLIC_URL}blog`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());

  return (
    <main>
      <h1>Основной сайт</h1>
    </main>
  );
}
