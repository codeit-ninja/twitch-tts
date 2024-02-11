import { PUBLIC_CLIENT_ID } from "$env/static/public";
import { useUserStore } from "$lib/store";
import eventemitter3 from "eventemitter3";

export type EventSubEvents = {
    welcome: ( session: EventDataSessionPayload ) => void;
}

export type EventDataSessionPayload = {
    id: string;
    connected_at: string;
    status: 'connected';
    reconnect_url: null;
}

export type EventDataSession = {
    metadata: {
        message_id: string;
        message_timestamp: string;
        message_type: 'session_welcome';
    },
    payload: {
        session: EventDataSessionPayload
    }
}

export type EventDataKeepalive = {
    metadata: {
        message_id: string;
        message_timestamp: string;
        message_type: 'session_keepalive';
    },
    payload: {}
}

export type EventMetadata<Type extends string> = {
    message_id: string;
    message_timestamp: string;
    message_type: Type;
}

export type EventData = {
    metadata: {
        message_id: string;
        message_timestamp: string;
        message_type: string;
    },
    payload: Record<string, any>
}

export type Badge = {
    set_id: string;
    id: string;
    info: string;
}

export type PayloadSubscription<Type extends string> = {
    condition: {
        broadcaster_user_id: string;
        user_id: string;
    };
    cost: number;
    created_at: string;
    id: string;
    status: string;
    transport: {
        method: 'websocket';
        session_id: string;
    },
    type: Type;
    version: string;
}

export type PayloadEvent<T extends Record<string, any>> = {
    badges: Badge[];
    broadcaster_user_id: string;
    broadcaster_user_login: string;
    broadcaster_user_name: string;
} & T;

export type EventDataSubscription<Type extends string, Payload extends Record<string, any>> = {
    metadata: EventMetadata<'notification'> & { subscription_type: string; subscription_version: string;  }
    payload: {
        event: PayloadEvent<Payload>;
        subscription: PayloadSubscription<Type>;
    }
}

export type ChatMessageFragmentMention = {
    user_id: string;
    user_login: string;
    user_name: string;
}

export type ChatMessageFragmentEmote = {
    emote_set_id: string;
    format: string[];
    id: string;
    owner_id: string;
}

export type ChatMessageFragments = {
    type: 'mention' | 'text' | 'emote';
    text: string;
    cheermote: string | null;
    emote: ChatMessageFragmentEmote | null;
    mention: ChatMessageFragmentMention | null;
}

export type EventDataSubscriptionChatMessagePayload = {
    channel_points_custom_reward_id: string | null;
    chatter_user_id: string;
    chatter_user_login: string;
    chatter_user_name: string;
    cheer: null;
    color: string;
    message: {
        text: string;
        fragments: ChatMessageFragments[];
    };
    message_id: string;
    message_type: string;
    reply: null;            // TODO Figure out what type this is
}

export type EventDataSubscriptionChatMessage = EventDataSubscription<'channel.chat.message', EventDataSubscriptionChatMessagePayload>;

export type SubscribeBody = {
    type: string;
    version: string;
    condition: { broadcaster_user_id: string, user_id: string },
    transport: { method: 'websocket', session_id: string }
}

export type Subscriptions = 
    'channel.chat.message' | 
    'channel.channel_points_custom_reward_redemption.add'

export type Data = {
    welcome_message: EventDataSession;
    session_keepalive: EventDataKeepalive;
}

export class EventSub extends eventemitter3<EventSubEvents> {
    /**
     * The connected session ID
     * 
     * @see https://dev.twitch.tv/docs/eventsub/handling-websocket-events/#welcome-message
     */
    sessionId = $state('asdasd');

    /**
     * This URL can change when the twitch eventsub server is swapped
     * 
     * @see https://dev.twitch.tv/docs/eventsub/handling-websocket-events/#reconnect-message
     */
    url = $state('wss://eventsub.wss.twitch.tv/ws');

    /**
     * The socket connection
     */
    wss?: WebSocket;

    /**
     * Current socket state
     */
    state = $state<'OPEN' | 'CLOSED'>( 'CLOSED' );

    public async connect(): Promise<Event> {
        return new Promise( ( resolve, reject ) => {
            this.wss = new WebSocket( this.url );

            this.wss.addEventListener( "open", (socket) => {
                this.state = 'OPEN';
                this.createEvents();

                resolve(socket);
            } );

            this.wss.addEventListener( "error", (socket) => {
                this.state = 'CLOSED';

                reject(socket);
            } );
        })
    }

    private createEvents() {
        if( ! this.wss ) {
            return;
        }

        this.wss.addEventListener( "message", (event) => {
            const data = JSON.parse(event.data) as EventData;

            console.log(data)

            if( data.metadata.message_type === 'session_welcome' ) {
                this.sessionId = (data as Data['welcome_message']).payload.session.id;
                this.emit( 'welcome', (data as Data['welcome_message']).payload.session )
            }
            
            if( data.metadata.message_type === 'notification' ) {

            }
        } )

        this.on( 'welcome', this.createSubscriptions )
    }

    private async createSubscriptions() {        
        this.subscribe( 'channel.chat.message' );
        this.subscribe( 'channel.channel_points_custom_reward_redemption.add' );
    }

    private async subscribe( type: Subscriptions ) {
        const { twitchUserId, accessToken } = useUserStore.get();
        const payload = {
            type,
            version: '1',
            condition: { broadcaster_user_id: twitchUserId, user_id: twitchUserId },
            transport: { method: 'websocket', session_id: this.sessionId }
        }

        return await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
            method: 'POST',
            body: JSON.stringify( payload ),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Client-Id': PUBLIC_CLIENT_ID
            }
        })
    }
}