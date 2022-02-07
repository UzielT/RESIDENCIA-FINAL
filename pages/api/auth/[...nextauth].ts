import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaClient } from "@prisma/client";

let userAccount: any = null;

const prisma = new PrismaClient();

const configuration = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Providers.Credentials({
      id: "credentials",
      name: "Login",
      async authorize(credentials) {
        const user = await prisma.usuario.findFirst({
          where: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (user !== null) {
          userAccount = user;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user: any, account: any, profile: any) {
      if (typeof user.id !== typeof undefined) {
        if (user.isActive === "1") {
          return user;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    async session(session: any, token: any) {
      if (userAccount !== null) {
        session.user = userAccount;
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined &&
            typeof session.user.id === typeof undefined))
      ) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
    async jwt(
      token: any,
      user: any,
      account: any,
      profile: any,
      isNewUser: any
    ) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (req: any, res: any) => NextAuth(req, res, configuration);
