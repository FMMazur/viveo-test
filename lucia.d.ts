/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("./src/lib/auth/lucia").Auth;
	type UserAttributes = {
		email: string;
	};
}