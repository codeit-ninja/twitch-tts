import { getVoices } from "$lib/server/polly";
import { prisma } from "$lib/server/prisma";
import { formDataToObject } from "$lib/utils";
import type { Actions, PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {
    const voices = await getVoices( locals.credentials )

    return {
        voices
    }
}

export const actions: Actions = {
	createTrigger: async ({ request, locals }) => {
		const data = await request.formData();
        const json = formDataToObject(data) as Forms.TriggerData;
        
        const actions = json.actions.map( action => ( {
            data: action,
            userId: locals.user.userId
        } ) )
        
        await prisma.triggers.create({
            data: {
                name: json.name,
                event: json.trigger,
                actions: {
                    createMany: {
                        data: actions
                    },
                },
                conditions: json.conditions,
                user: {
                    connect: {
                        id: locals.user.userId
                    }
                }
            }
        })
	}
}