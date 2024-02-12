import { PUBLIC_CLIENT_ID } from "$env/static/public";
import { useUserStore } from "$lib/store";
import eventemitter3 from "eventemitter3";

export type EventsubMetadata<EventType extends string, SubscriptionMetadata extends Record<string, any> = Record<string, any>> = {
    message_id: string;
    message_type: EventType;
    message_timestamp: string;
} & SubscriptionMetadata;

export type EventsubMetadataSubscription<SubType extends keyof Subscriptions> = EventsubMetadata<'notification'> & {
    subscription_type: SubType;
    subscription_version: string;
}

export type EventsubPayload<Payload> = Payload;
export type EventsubData<EventType extends string, Payload extends Record<string, any>, SubscriptionMetadata extends Record<string, any> = Record<string, any>> = {
    metadata: EventsubMetadata<EventType, SubscriptionMetadata>;
    payload: EventsubPayload<Payload>;
}

export type EventsubSessionWelcomePayload = {
    session: {
        id: string;
        status: 'connected';
        connected_at: string;
        keepalive_timeout_seconds: number;
        reconnect_url: string | null;
    }
}

export type EventsubSessionKeepalivePayload = {}

export type Conditions = {
    broadcaster_user_id: string;
    user_id: string;
    moderator_user_id: string;
    from_broadcaster_user_id: string;
    to_broadcaster_user_id: string;
    reward_id: string;
    client_id: string;
    conduit_id: string;
    organization_id: string;
    category_id: string;
    campaign_id: string;
    extension_client_id: string;
}

export type EventsubNotificationPayload<SubscriptionType extends string, Condition extends Partial<Conditions>, Event extends Record<string, any>> = {
    subscription: {
        id: string;
        enabled: string;
        type: SubscriptionType;
        version: string;
        cost: number;
        condition: Condition;
        transport: {
            method: 'websocket';
            session_id: string;
        }
    }
    event: Event;
}

export type Badge = {
    set_id: string;
    id: string;
    info: string;
}

export type ChannelChatMessageFragmentMention = {
    user_id: string;
    user_login: string;
    user_name: string;
}

export type ChannelChatMessageFragmentEmote = {
    emote_set_id: string;
    format: string[];
    id: string;
    owner_id: string;
}

export type ChannelChatMessageFragments = {
    type: 'mention' | 'text' | 'emote';
    text: string;
    cheermote: string | null;
    emote: ChannelChatMessageFragmentEmote | null;
    mention: ChannelChatMessageFragmentMention | null;
}

export type EventsubNotificationChannelChatMessagePayload = EventsubNotificationPayload<
    'channel.chat.message',
    { 
        broadcaster_user_id: string, 
        user_id: string 
    },
    {
        broadcaster_user_id: string
        broadcaster_user_login: string
        broadcaster_user_name: string
        chatter_user_id: string
        chatter_user_login: string
        chatter_user_name: string
        message_id: string
        message: {
            text: string,
            fragments: ChannelChatMessageFragments[];
        }
        color: string,
        badges: Badge[];
        message_type: string,
        cheer: null,
        reply: any; // TODO: Figure out what type this is supposed to be
        channel_points_custom_reward_id: null
    }
>

export type EventsubNotificationChannelChannelPointsCustomRewardRedemptionAddPayload = EventsubNotificationPayload<
    'channel.channel_points_custom_reward_redemption.add',
    { 
        broadcaster_user_id: string;
        reward_id: string;
    },
    {
        id: string;
        broadcaster_user_id: string;
        broadcaster_user_login: string;
        broadcaster_user_name: string;
        user_id: string;
        user_login: string;
        user_name: string;
        user_input: string;
        status: string;
        reward: {
            id: string;
            title: string;
            cost: number;
            prompt: string;
        },
        redeemed_at: string;
    }
>

export type Eventsub = {
    session_welcome: EventsubData<'session_welcome', EventsubSessionWelcomePayload>;
    session_keepalive: EventsubData<'session_keepalive', EventsubSessionKeepalivePayload>;
    notification: EventsubData<'notification', EventsubNotificationPayload<any, any, any>, EventsubMetadataSubscription<any>>; // unknown at this point
}

export type Subscriptions = {
    'channel.chat.message': EventsubData<
        'notification', 
        EventsubNotificationChannelChatMessagePayload, 
        EventsubMetadataSubscription<'channel.chat.message'>
    >;
    'channel.channel_points_custom_reward_redemption.add': EventsubData<
        'notification', 
        EventsubNotificationChannelChannelPointsCustomRewardRedemptionAddPayload, 
        EventsubMetadataSubscription<'channel.channel_points_custom_reward_redemption.add'>
    >;
}

type GetTypeForEvent<K extends keyof Eventsub> = Eventsub[K] extends { metadata: { message_type: K } }
    ? Eventsub[K]
    : never;

type GetTypeForSubscription<K extends keyof Subscriptions> = Subscriptions[K] extends { metadata: { subscription_type: K } }
    ? Subscriptions[K]
    : never;

export class EventSub extends eventemitter3<EventSubEvents> {
    /**
     * The connected session
     * 
     * @see https://dev.twitch.tv/docs/eventsub/handling-websocket-events/#welcome-message
     */
    session = $state<EventsubSessionWelcomePayload['session']>();

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

    constructor() {
        super();
        
        $effect( () => {
            if( ! this.session ) {
                return;
            }

            this.on( 'SESSION', this.createSubscriptions );
            this.emit( 'SESSION', this.session );
        })
    }

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
            // At this point we don't know what event we are dealing with yet
            const data = JSON.parse(event.data) as EventsubData<string, Record<string, any>>;

            if( this.isEvent( data, 'notification' ) ) {
                this.fireEvent( data.metadata.subscription_type, data.payload.event )
            }

            if( this.isEvent( data, 'session_welcome' ) ) {
                this.session = data.payload.session;
            }
        } )
    }

    private fireEvent<T extends keyof Subscriptions>( type: T, data: any ) {
        const events: {[key in keyof Subscriptions]: any } = {
            "channel.chat.message": () => this.emit( 'CHANNEL:CHAT:MESSAGE', data ),
            "channel.channel_points_custom_reward_redemption.add": () => this.emit( 'CHANNEL:CHANNEL_POINTS_CUSTOM_REWARD_REDEMPTION:ADD', data ),
        };
        
        (events[type])();
    }

    private isEvent<K extends keyof Eventsub>( data: EventsubData<string, Record<string, any>>, type: K ): data is GetTypeForEvent<K> {
        return data.metadata.message_type === type;
    }

    private isSubscription<K extends keyof Subscriptions>( data: Subscriptions[K], type: K ): data is GetTypeForSubscription<K> {        
        return data.metadata.subscription_type === type;
    }

    private async createSubscriptions() {        
        this.subscribe( 'channel.chat.message' );
        this.subscribe( 'channel.channel_points_custom_reward_redemption.add' );
    }

    private async subscribe( type: keyof Subscriptions ) {
        // Cant continue without a session
        if( ! this.session ) {
            return;
        }

        const { twitchUserId, accessToken } = useUserStore.get();
        const payload = {
            type,
            version: '1',
            condition: { broadcaster_user_id: '37516578', user_id: twitchUserId },
            transport: { method: 'websocket', session_id: this.session.id }
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