import { getVoices } from '$lib/server/polly';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const voices = await getVoices( locals.credentials );

    return {
        voices
    }
}