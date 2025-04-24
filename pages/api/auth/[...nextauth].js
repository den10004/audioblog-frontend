// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Настройки сессии
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      // Поля формы входа
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      /*
      async authorize(credentials, req) {
        alert(credentials);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const user = await res.json();

          if (res.ok && user) {
            return user;
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
      */

      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // Важно вернуть объект пользователя!
        }

        return null; // Если вернётся null, будет 401
      },
    }),
  ],

  // Callbacks для настройки токенов и сессий
  callbacks: {
    async jwt({ token, user }) {
      // Добавляем данные пользователя в токен
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.role = user.role;
        // Другие необходимые поля
      }
      return token;
    },

    async session({ session, token }) {
      // Добавляем данные из токена в сессию
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },

  // Дополнительные страницы (например, кастомная страница входа)
  pages: {
    signIn: "/user", // Путь к вашей странице входа
  },

  // Отладка в development
  debug: process.env.NODE_ENV === "development",
});
