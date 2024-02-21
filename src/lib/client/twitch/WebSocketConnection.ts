import EventEmitter from "eventemitter3";

type Events = {
    'channel.chat.message': ( data: EventsubNotificationChannelChatMessagePayload['event'] ) => void;
    'notification': ( 
        data: 
            Subscriptions['channel.chat.message'] | 
            Subscriptions['channel.channel_points_custom_reward_redemption.add'] 
    ) => void;
}

export default class WebSocketConnection extends EventEmitter<Events> {
    public session?: EventsubSessionWelcomePayload['session'];
    
    public wssUrl = 'wss://eventsub.wss.twitch.tv/ws';

    public wss?: WebSocket;

    public async connect(): Promise<Event> {
        return new Promise( ( resolve, reject ) => {
            this.wss = new WebSocket( this.wssUrl );

            this.wss.addEventListener( "error", reject );
            this.wss.addEventListener( "message", (event) => {
                const data = JSON.parse(event.data);

                if( data.metadata.message_type === 'session_welcome' ) {
                    this.session = data.payload.session;
                }

                if( data.metadata.message_type === 'notification' ) {
                    this.emit( data.payload.subscription.type, data.payload.event );
                    this.emit( 'notification', data );
                }

                resolve( event );
            } )
        })
    }

    private isEvent<K extends keyof Eventsub>( data: EventsubData<string, Record<string, any>>, type: K ): data is GetTypeForEvent<K> {
        return data.metadata.message_type === type;
    }
}