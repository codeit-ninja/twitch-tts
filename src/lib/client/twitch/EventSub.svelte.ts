import { PUBLIC_CLIENT_ID } from "$env/static/public";
import { useUserStore } from "$lib/store";
import eventemitter3 from "eventemitter3";

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
            condition: { broadcaster_user_id: twitchUserId, user_id: twitchUserId },
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