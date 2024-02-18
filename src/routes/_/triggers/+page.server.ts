import { getVoices } from "$lib/server/polly";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const voices = await getVoices( locals.credentials )

    return {
        voices
    }
}

export const actions: Actions = {
	createTrigger: async ({ request, locals }) => {
		const data = await request.json();
	}
}