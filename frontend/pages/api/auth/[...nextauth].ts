"use client";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    FacebookProvider({
      id: "facebook",
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      id: "signin",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        const payload = {
          email: credentials.email as string,
          password: credentials.password as string,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();
        return user?.data;
      },
    }),

    CredentialsProvider({
      id: "register",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email",
        },
        first_name: { label: "first_name", type: "first_name" },
        last_name: { label: "last_name", type: "last_name" },
        phone: { label: "phone", type: "phone" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        const payload = {
          email: credentials.email,
          first_name: credentials.first_name,
          last_name: credentials.last_name,
          phone: credentials.phone,
          password: credentials.password,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}auth/register`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();
        return user?.data;
      },
    }),
  ],

  secret: process.env.JWT_SECRET,

  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && user) {
        if (
          account?.provider === "google" ||
          account?.provider === "facebook"
        ) {
          // split name into first_name and last_name
          const splitName = user.name.split(" ");
          const firstName = splitName[0];
          const lastName = splitName[1];

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}auth/provider`,
            {
              method: "POST",
              body: JSON.stringify({
                email: user?.email,
                first_name: firstName,
                last_name: lastName,
                profile: user?.image,
                loginType: account?.provider,
                password: user?.id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const userData = await res.json();

          return {
            ...token,
            accessToken: userData?.data?.token,
            refreshToken: userData?.data?.token,
            name: userData?.data?.first_name + " " + userData?.data?.last_name,
          };
        } else {
          return {
            ...token,
            accessToken: user.token,
            refreshToken: user.token,
            name: user?.first_name + " " + user?.last_name,
          };
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return token && token?.accessToken !== undefined ? session : undefined;
    },
  },
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/register",
  },
});
