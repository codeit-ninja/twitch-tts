<script lang="ts">
    import { PUBLIC_CLIENT_ID } from "$env/static/public";
    import { EventSub } from "$lib/client/twitch/EventSub.svelte.js";
    import Widget from "$lib/components/widgets/Widget.svelte";
    import WidgetStreamChat from "$lib/components/widgets/WidgetStreamChat.svelte";
    import { onMount } from "svelte";

    const { data } = $props();
    let sessionId = $state<string>();

    onMount(() => {
        const eventSub = new EventSub();

        eventSub.connect();
        // const wss = new WebSocket('wss://eventsub.wss.twitch.tv/ws');
        
        // wss.addEventListener("open", () => {
        //     console.log('Connected');
        // })

        // wss.addEventListener("message", (event) => {
        //     const data = JSON.parse( event.data );

        //     if( data.metadata.message_type === 'session_welcome' ) {
        //         sessionId = data.payload.session.id;
        //     }
        // })
    })

    // $effect(() => {
    //     if( ! sessionId ) {
    //         return;
    //     }
        
    //     ( async () => {
    //         const eventData = {
    //             type: 'channel.chat.message',
    //             version: '1',
    //             condition: { broadcaster_user_id: '418955001', user_id: '418955001' },
    //             transport: { method: 'websocket', session_id: sessionId }
    //         }

    //         const request = await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
    //             method: 'POST',
    //             body: JSON.stringify( eventData ),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${data.user.accessToken}`,
    //                 'Client-Id': PUBLIC_CLIENT_ID
    //             }
    //         })
    //         const response = await request.json();

    //         console.log(response);
    //     })()
    // })
</script>

<WidgetStreamChat title="Stream chat" icon="notes" />