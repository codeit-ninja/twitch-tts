import type { LayoutData } from '../../routes/_/$types';
import { EventSub } from '$lib/client/twitch/EventSubs';

type TriggerInitMessagePayload = {
    type: 'INIT';
    user: LayoutData['user'],
    triggers: LayoutData['triggers']
}

onmessage = async (e) => {
    const { triggers, user, type } = JSON.parse( e.data ) as TriggerInitMessagePayload;
    const eventSub = new EventSub();

    await eventSub.connect();

    for( const trigger of triggers ) {
        console.log(trigger)
    }

    console.log(eventSub)
}