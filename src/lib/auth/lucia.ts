import lucia from "lucia-auth";
import { nextjs } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

export const auth = lucia({
	adapter: prisma(new PrismaClient()),
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: nextjs(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			email: userData.email
		} as const;
	}
})

export type Auth = typeof auth;