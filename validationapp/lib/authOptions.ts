import prisma from "@/prisma/client";
import { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { signInSchema } from "../app/schema";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async function (credentials, req) {
        const parsed = signInSchema.safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null;

        return (await bcrypt.compare(password, user.passwordHash))
          ? user
          : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | AdapterUser }) {
      if (user) token.id = ("id" in user ? user.id : undefined) ?? token.sub;
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id =
          (token as JWT & { id?: string }).id ?? (token.sub as string);
      }
      return session;
    },
  },
  pages: {
    signIn: "/pages/auth/signin",
  },
};