// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error.message.includes("404")) {
    return (
      <div>
        <h2>Страница не найдена</h2>
        <button onClick={() => reset()}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Что-то пошло не так!</h2>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
