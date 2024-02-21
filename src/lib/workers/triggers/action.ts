import { getProperty } from 'dot-prop';
import { tts } from '../actions/TTS';

let i = 0;
let output: string[] = [];

export function parseTags( input: string, tags: string[], data: AllSubscriptions ) {
    for( const tag of tags ) {
        input = input.replace( `{${ tag }}`, getProperty( data.payload.event, tag ) );
    }

    return input;
}

export const action = ( { engine, message, type, voice, tags }: TriggerActions, data: AllSubscriptions ) => {
    if( type === 'tts' ) {
        if( tags ) {
            message = parseTags( message, tags, data )
        }

        tts.add( message, engine, voice );
    }
}