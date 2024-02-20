<script lang="ts">
    import type { EventsubNotificationChannelChatMessagePayload } from "$lib/client/twitch/EventSub.svelte";
 
    const { data } = $props<{ data: EventsubNotificationChannelChatMessagePayload['event'] }>();
</script>

<div class="element--chat--message">
    <span class="username" style:color={ data.color }>{ data.chatter_user_name }: </span>
    <span class="message">
        {#each data.message.fragments as fragment}
            {#if fragment.type === 'emote'}
                <img src={`https://static-cdn.jtvnw.net/emoticons/v2/${ fragment.emote!.id }/default/dark/1.0`} alt={ fragment.text } />
            {/if}
            {#if fragment.type === 'text'}
                { fragment.text }
            {/if}
        {/each}
    </span>
</div>