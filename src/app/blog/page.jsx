import Image from "next/image";
import styles from "./../page.module.css";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata() {
  const blogs = await fetch(`${process.env.URL}blog`).then((res) => res.json());

  return {
    title: blogs.title,
    description: blogs.description,
    openGraph: {
      images: [],
    },
  };
}

export default async function Blog() {
  const blogs = await fetch(`${process.env.URL}blog`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());

  return (
    <div>
      <h1>Блоги</h1>
      <ul>
        {blogs.map((i) => (
          <Link key={i.id} href={`/blog/${i.id}`}>
            <div>{i.id}</div>
            <div>{i.title}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
