import type { User, UserTwitchTokenData } from '@prisma/client';
import type { AwsCredentialIdentity } from '@smithy/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            credentials: AwsCredentialIdentity,
            user: UserTwitchTokenData & { user: User }
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
