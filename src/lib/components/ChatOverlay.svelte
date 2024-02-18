<script lang="ts">
    import { EventSub, type EventsubNotificationChannelChatMessagePayload } from "$lib/client/twitch/EventSub.svelte";
    import { onMount } from "svelte";
    import ChatMessage from "./elements/ChatMessage.svelte";
    import { objToCssString } from "$lib/utils";

    type Props = {
        font: GoogleWebFont | undefined,
        css: {
            overlay: Partial<CSSStyleDeclaration>;
            container: Partial<CSSStyleDeclaration>;
        },
        styling?: {
            'chat--overlay': Partial<CSSStyleDeclaration>;
            'chat--overlay--container': Partial<CSSStyleDeclaration>;
            'element--chat--message': Partial<CSSStyleDeclaration>;
            [key: string]: Partial<CSSStyleDeclaration>;
        }
    }

    let { font, css, styling } = $props<Props>();

    const messages = $state<EventsubNotificationChannelChatMessagePayload['event'][]>([]);
    const eventSub = new EventSub();

    onMount(() => {
        eventSub.connect();
    })

    eventSub.on( 'CHANNEL:CHAT:MESSAGE', message => {
        messages.push( message )
    } );
</script>
<div class="chat--overlay" style:font-family={ font?.family } style={ objToCssString( css.overlay ) }>
    <div class="chat--overlay--container" style={ objToCssString( css.container ) }>
        {#each messages as message}
            <ChatMessage data={message} />
        {/each} 
    </div>
</div>
