import API from "./API";
import WebSocketConnection from "./WebSocketConnection";

let connection: WebSocketConnection;

export default class EventSub extends API {
    public resource = 'eventsub';

    /**
     * Gets a list of EventSub subscriptions
     * 
     * @param params
     * @see https://dev.twitch.tv/docs/api/reference/#get-eventsub-subscriptions
     */
    async getSubscriptions( params?: EventSub.GetSubscriptionsParams ) {
        return await this.GET( 'subscriptions', params );
    }
    
    async createSubscription<T extends EventSub.SubscriptionTypes>( 
        type: T, 
        body: Omit<EventSub.CreateSubscriptionRequestBody<T>, 'transport' | 'type'> 
    ) {
        if( ! this.websocket.session ) {
            throw new Error( 'No session found. Did you call `eventSub.websocket.connect()`?' )
        }

        const data: EventSub.CreateSubscriptionRequestBody<T> = {
            type,
            transport: {
                method: 'websocket',
                session_id: this.websocket.session.id
            },
            ...body
        }

        return await this.POST( 'subscriptions', data )
    }

    async deleteSubscription( id: string ) {
        return await this.DELETE( 'subscriptions', { id } )
    }

    get websocket() {
        if( ! connection ) {
            connection = new WebSocketConnection();
        }

        return connection;
    }
}