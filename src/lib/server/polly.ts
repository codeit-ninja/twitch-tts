import { getSynthesizeSpeechUrl } from '@aws-sdk/polly-request-presigner'
import { Engine, Polly, VoiceId, type Voice } from '@aws-sdk/client-polly'
import { useCredentialsStore } from '$lib/store';
import type { AwsCredentialIdentity } from '@aws-sdk/types';

// Cache some of the values
let client: Polly | null = null;
let voices: Voice[] | null = null;

/**
 * Get AWS Polly client instance
 * 
 * @returns `Polly`
 */
export const getClient = ( credentials: AwsCredentialIdentity ) => {
    if( ! client ) {
        client = new Polly({ region: 'us-east-1', credentials } );
    }

    return client;
}
/**
 * Get a list of available voices from AWS Polly
 * 
 * @returns `Voice[]` 
 */
export const getVoices = async ( credentials: AwsCredentialIdentity ) => {
    if( voices ) {
        return voices;
    }

    const availableVoices = await getClient( credentials ).describeVoices({ Engine: 'neural' });

    return voices = availableVoices.Voices!.filter( voice => voice.LanguageCode === 'en-GB' || voice.LanguageCode === 'en-US' );
}

/**
 * 
 * @param text      - text to speak
 * @param voiceId   - name of the voice character
 * @param engine    - neural | long-form | standard
 * 
 * @returns `string`
 */
export const generateSpeechUrl = ( text: string, voiceId: VoiceId = 'Kevin', engine: Engine = 'neural' ) => {
    return getSynthesizeSpeechUrl({ 
        client: createClient(),
        params: {
            OutputFormat: "ogg_vorbis",
            SampleRate: "24000",
            Text: `<speak><prosody rate='100%'>${text}</prosody></speak>`,
            TextType: "ssml",
            VoiceId: voiceId,
            Engine: engine,
        }
    }) as Promise<string>;
}