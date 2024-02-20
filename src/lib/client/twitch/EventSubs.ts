export class EventSub {
    url = 'wss://eventsub.wss.twitch.tv/ws';

    session?: EventsubSessionWelcomePayload['session'];
    
    wss?: WebSocket;

    constructor() {
        
    }

    public async connect(): Promise<Event> {
        return new Promise( ( resolve, reject ) => {
            this.wss = new WebSocket( this.url );

            this.wss.addEventListener( "error", reject );
            this.wss.addEventListener( "message", (event) => {
                const data = JSON.parse(event.data) as EventsubData<string, Record<string, any>>;

                if( data.metadata.message_type === 'session_welcome' ) {
                    this.session = data.payload.session;
                }

                resolve( event );
            } )
        })
    }

    public async subscribe( event: string ) {

    }
}