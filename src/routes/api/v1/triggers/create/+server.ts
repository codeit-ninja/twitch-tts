import type { RequestEvent } from "@sveltejs/kit";
import { TriggersWithRelationsSchema } from '$lib/schemas'

export const POST = async ( { request }: RequestEvent ) => {
    const json = await request.json();
    const data = TriggersWithRelationsSchema.parse( json );
}