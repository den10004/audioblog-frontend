import Image from "next/image";
import styles from "./../page.module.css";
import { Metadata } from "next";
import Link from "next/link";
/*
export async function generateMetadata() {
  const blogs = await fetch(`${process.env.NEXT_PUBLIC_URL}blog`).then((res) =>
    res.json()
  );

  return {
    title: blogs.title,
    description: blogs.description,
    openGraph: {
      images: [],
    },
  };
}
*/
interface Blog {
  id: number;
  description: string;
  title: string;
  content: string;
}

export default async function Blog() {
  const blogs = await fetch(`${process.env.NEXT_PUBLIC_URL}articles`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());

  return (
    <div>
      <h1>Блоги</h1>
      <ul>
        {blogs.map((i: Blog) => (
          <Link key={i.id} href={`/blog/${i.id}`}>
            <div>{i.id}</div>
            <div>{i.description}</div>
            <div>{i.title}</div>
            <div>{i.content}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
