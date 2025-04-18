import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetch(`${process.env.URL}blog/${slug}`).then((res) =>
    res.json()
  );

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      images: [],
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = await fetch(`${process.env.URL}blog/${slug}`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());

  return (
    <div>
      <h1>{blog.author}</h1>
      <p>{blog.title}</p>
      <p>{blog.content}</p>
      <button>
        <Link href={`/blog`}>Назад</Link>
      </button>
    </div>
  );
}
