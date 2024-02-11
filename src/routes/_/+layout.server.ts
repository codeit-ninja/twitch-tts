import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    const ttsConfig = await prisma.ttsConfig.findFirst(
        {
            where: { userId: locals.user.userId }
        }
    )

	return {
		credentials: locals.credentials,
        user: locals.user,
        ttsConfig,
        twitchUserId: locals.twitchUserId
	}
}