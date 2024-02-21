import type { LayoutData } from '../../routes/_/$types';
import EventSub from '$lib/client/twitch/EventSub';
import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { handle } from './triggers/handle';
import { tts } from './actions/TTS';

type TriggerInitMessagePayload = {
    type: 'INIT';
    user: LayoutData['user'] & { twitchUserId: string },
    triggers: LayoutData['triggers']
}

onmessage = async (e) => {
    const { type } = e.data;

    /**
     * TODO: This is just proof of concept for the implementation, the actual implementation needs to be better
     */
    if( type === 'init' ) {
        const { triggers, user } = e.data;
        const eventSub = new EventSub( user.accessToken, PUBLIC_CLIENT_ID );

        await eventSub.websocket.connect();

        for( const trigger of triggers ) {
            if( trigger.event === 'channel.chat.message' ) {
                await eventSub.createSubscription( 'channel.chat.message', {
                    condition: {
                        broadcaster_user_id: user.twitchUserId,
                        user_id: user.twitchUserId
                    },
                    version: '1'
                } )
            }
        }

        eventSub.websocket.on( 'notification', data => handle( triggers, data ) );
    }
    
    if( type === 'tts.playing' ) {
        tts.playing = true;
    }

    if( type === 'tts.ended' ) {
        tts.playing = false;
    }
}