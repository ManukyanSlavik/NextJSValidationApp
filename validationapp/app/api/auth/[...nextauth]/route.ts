import prisma from "@/prisma/client";
import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
<<<<<<< HEAD
import { schema } from "../../users/schema";
=======
import { signInSchema } from "../../../schema";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
>>>>>>> After-Sign-In

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async function (credentials, req) {
        const parsed = schema.safeParse(credentials);

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
<<<<<<< HEAD
=======
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
    signIn: "/pages/signin",
  },
>>>>>>> After-Sign-In
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
