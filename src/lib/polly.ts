import type { SynthesizeSpeechInput } from 'aws-sdk/clients/polly'
import { getSynthesizeSpeechUrl } from '@aws-sdk/polly-request-presigner'
import { Polly, PollyClient, VoiceId } from '@aws-sdk/client-polly'
import { useCredentialsStore } from './store';

export const getClient = () => {
    return new Polly({ region: 'us-east-1', credentials: useCredentialsStore.getCredentials() } );
}

export const getVoices = async () => {
    return (await getClient().describeVoices({ Engine: 'neural' }))
        .Voices?.filter( voice => voice.LanguageCode === 'en-GB' || voice.LanguageCode === 'en-US' )
}

export const generateSpeechUrl = ( text: string, voiceId: VoiceId = 'Kevin' ) => {
    return getSynthesizeSpeechUrl({ 
        client: getClient(),
        params: {
            OutputFormat: "ogg_vorbis",
            SampleRate: "24000",
            Text: text,
            TextType: "text",
            VoiceId: voiceId,
            Engine: "neural",
        }
    }) as Promise<string>;
}

// export class AWSPolly {
//     constructor() {
//         //AWS.config.region = 'us-east-1';
//         //AWS.config.credentials = new AWS.CognitoIdentityCredentials( { IdentityPoolId: 'us-east-1:20b7d50c-d752-4f3e-9f70-2a5335f01e92' } )

//         const credentials = new CognitoIdentity({ region: 'eu-central-1' })
//         console.log(credentials.getCredentialsForIdentity({ 
//             IdentityId: 'eu-central-1:23834720-274a-c300-f07c-19d6d0e389bc'
//         }))

//         //this.client = new Polly({ region: 'us-east-1', credentials: { accessKeyId: AWS.config.credentials.accessKeyId, secretAccessKey: AWS.config.credentials.secretAccessKey } })
//     }

//     public async authenticate() {

//     }

//     public async test() {
    //     const params = {
    //         OutputFormat: "ogg_vorbis",
    //         SampleRate: "24000",
    //         Text: "@fknoobscoh what % of coh would you say cheats? i would say 75%",
    //         TextType: "text",
    //         VoiceId: "Kevin",
    //         Engine: "neural",
    //     } satisfies SynthesizeSpeechInput

    //     const signer = new AWS.Polly.Presigner({ params, service: this.service })
    //     signer.getSynthesizeSpeechUrl(params, function(error, url) {
    //         console.log(url)
    //     });

    //     return await getSynthesizeSpeechUrl({
    //         client: this.client,
    //         params: {
    //             OutputFormat: "ogg_vorbis",
    //             SampleRate: "24000",
    //             Text: "@fknoobscoh what % of coh would you say cheats? i would say 75%",
    //             TextType: "text",
    //             VoiceId: "Kevin",
    //             Engine: "neural",
    //         }
    //     })
    // }

//     // public getVoices(): Promise<AWS.Polly.VoiceList> {
//     //     return new Promise(( resolve, reject ) => {
//     //         this.service.describeVoices( (error, data) => {
//     //             if( error ) {
//     //                 reject( error )
//     //             }

//     //             resolve( data.Voices!.filter(voice => voice.LanguageCode === 'en-US') )
//     //         } )
//     //     })
//     // }
// }

// export const polly = new AWSPolly();