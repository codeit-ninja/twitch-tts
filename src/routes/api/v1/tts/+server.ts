import { generateSpeechUrl } from "$lib/server/polly";
import type { RequestEvent } from "./$types";

export async function POST({ locals, request, fetch }: RequestEvent) {
    const { message, voiceId, engine } = await request.json();
    const url = await generateSpeechUrl( locals.credentials, message, voiceId, engine );

    const blobRequest = await fetch( url );
    const blob = await blobRequest.blob();

    return new Response( blob );
}