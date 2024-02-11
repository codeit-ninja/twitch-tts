import { getVoices } from '$lib/server/polly';
import { prisma } from '$lib/server/prisma';
import type { Prisma } from '@prisma/client';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const voices = await getVoices( locals.credentials );
    const defaults = await prisma.ttsConfig.findFirst({ where: { userId: locals.user.userId } })

    return {
        voices,
        defaults
    }
}

export const actions: Actions = {
	saveConfig: async ({ request, locals }) => {
		const formData = await request.formData();

        const data: Prisma.TtsConfigCreateInput = {
            voice: JSON.parse( formData.get( 'voice' ) as string ) as Record<string, any>,
            channel: formData.get( 'channel' ) as string,
            enabled: formData.get( 'enabled' ) === 'on',
            engine: formData.get( 'engine' ) as string,
            user: {
                connect: {
                    id: locals.user.userId
                }
            }
        }

        try {
            const result = await prisma.ttsConfig.upsert({
                create: data,
                update: data,
                where: {
                    userId: locals.user.userId
                }
            })

            return {
                success: true,
                data: result
            }
        } catch (error) {
            return {
                success: false,
                data,
                error
            }
        }
	}
}