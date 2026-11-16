import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { env } from "../config/env";

const client = new MongoClient(env.MONGODB_URI);
const db = client.db();
export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigin: [env.CLIENT_URL],
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    autoSignin: false,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      role: {
        type: ["member", "admin"],
        required: false,
        defaultValue: "member",
        input: false,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 * 1000, //5 minutes
    },
  },
});

export type Session = typeof auth.$Infer.Session;
