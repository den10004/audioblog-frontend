// app/(not-found)/layout.tsx
export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main className="not-found">{children}</main>
      </body>
    </html>
  );
}
