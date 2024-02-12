<script lang="ts">
    import type { MaterialSymbol } from "material-symbols";
    import Widget from "./Widget.svelte";
    import { EventSub, type EventsubNotificationChannelChatMessagePayload } from "$lib/client/twitch/EventSub.svelte";
    import { onMount } from "svelte";
    import ChatMessage from "../elements/ChatMessage.svelte";

    const { title, icon } = $props<{
        title: string;
        icon?: MaterialSymbol;
    }>();

    const messages = $state<EventsubNotificationChannelChatMessagePayload['event'][]>([]);
    const eventSub = new EventSub();

    onMount(() => {
        eventSub.connect();
    })

    eventSub.on( 'CHANNEL:CHAT:MESSAGE', message => {
        messages.push( message )
        console.log( messages )
    } );
</script>

<Widget {title} {icon}>
    <div class="widget--stream--chat">
        {#each messages as message}
            <ChatMessage data={message} />
        {/each}
    </div>
</Widget>
<style lang="scss">
    :global(.widget--content) {
        max-height: 450px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column-reverse;
        margin: .3rem;
    }

    .widget--stream--chat {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }
</style>