export type RequestData = {
    params?: Record<string, string>;
    body?: BodyInit;
}

export default abstract class API {
    public abstract resource: string;

    constructor(
        public token: string,
        public clientId: string,
        public url = 'https://api.twitch.tv/helix'
    ) {}

    protected async GET( path: string, params?: RequestData['params'] ) {
        return this.fetch( 'GET', path, { params } );
    }

    protected async PUT( path: string ) {

    }

    protected async POST( path: string, data: Record<string, any> ) {
        return this.fetch( 'POST', path, { body: JSON.stringify( data ) } );
    }

    protected async PATCH( path: string ) {

    }

    protected async DELETE( path: string, params: RequestData['params'] ) {
        return this.fetch( 'DELETE', path, { params } );
    }

    protected async fetch( method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE', path: string, { body, params }: RequestData ) {
        const url = `${ this.url }/${ this.resource }/${ path }${ params ? '?' + new URLSearchParams( params ).toString() : '' }`.replace('//', '/');
        const request = await fetch( url, {
            method,
            body,
            headers: this.headers
        });

        if( request.status === 204 ) {
            return;
        }

        return await request.json();
    }

    get headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ this.token }`,
            'Client-Id': this.clientId
        }
    }
}