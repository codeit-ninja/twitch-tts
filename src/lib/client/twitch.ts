import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { useTtsConfigStore, useUserStore } from '$lib/store';
// import { ChatClient } from '@twurple/chat';
// import { StaticAuthProvider } from '@twurple/auth';

import { Client } from 'tmi.js';

let client: Client;

export const getChatClient = () => {
    if( ! client ) {
        const { accessToken, scope, user } = useUserStore.get();
        const { channel } = useTtsConfigStore.get();

        client = new Client(
            {
                options: {
                    debug: true,
                    clientId: PUBLIC_CLIENT_ID
                },
                identity: {
                    username: user.username,
                    password: accessToken
                },
                channels: [channel]
            }
        );
    }

    return client;
}