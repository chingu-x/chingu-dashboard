import NextAuth from "next-auth/next";
import { options } from "./options";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(options);

export { handler as GET, handler as POST };
