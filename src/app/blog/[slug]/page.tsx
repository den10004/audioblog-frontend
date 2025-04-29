import { Metadata } from "next";
import Link from "next/link";
/*
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetch(`${process.env.NEXT_PUBLIC_URL}blog/${slug}`).then(
    (res) => res.json()
  );

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      images: [],
    },
  };
}
*/

export default async function BlogPage({ params }: any) {
  const { slug } = await params;
  const blog = await fetch(`${process.env.NEXT_PUBLIC_URL}articles/${slug}`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());

  return (
    <div>
      <h1>{blog.id}</h1>
      <p>{blog.title}</p>
      <p>{blog.content}</p>
      <p>{blog.createdAt}</p>
      <p>{blog.updatedAt}</p>
      <button>
        <Link href={`/blog`}>Назад</Link>
      </button>
    </div>
  );
}
