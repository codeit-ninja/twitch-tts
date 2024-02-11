import { prisma } from '$lib/server/prisma';
import type { Prisma } from '@prisma/client';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const ttsConfig = await prisma.ttsConfig.findFirst({ 
        where: { userId: locals.user.userId }
    })

    return {
        ttsConfig
    }
}