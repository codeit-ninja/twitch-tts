import API from "./API";
import EventSub from "./EventSub";

export class Twitch extends API {
    public resource = '';
    
    public path = '/';
    
    constructor( url = 'https://api.twitch.tv/helix', token: string ) {
        super( url, token )
    }

    eventSub() {
        return new EventSub( this.url, this.token );
    }
}