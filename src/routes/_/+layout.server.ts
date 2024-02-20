import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    const ttsConfig = await prisma.ttsConfig.findFirst(
        {
            where: { userId: locals.user.userId }
        }
    );

    const triggers = await prisma.triggers.findMany(
        {
            where: {
                userId: locals.user.userId
            },
            select: {
                actions: {
                    select: {
                        data: true
                    }
                },
                id: true,
                conditions: true,
                userId: false,
                event: true
            }
        }
    )

	return {
        triggers,
		credentials: locals.credentials,
        user: locals.user,
        ttsConfig,
        twitchUserId: locals.twitchUserId
	}
}