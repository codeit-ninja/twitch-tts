<script lang="ts">
    import type { EventsubNotificationChannelChatMessagePayload } from "$lib/client/twitch/EventSub.svelte";
 
    const { data } = $props<{ data: EventsubNotificationChannelChatMessagePayload['event'] }>();

    console.log(data.badges);
</script>

<div class="element--chat--message">
    <span>
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
<style lang="scss">
    .element--chat--message {
        position: relative;
        
        span {
            position: relative;
            display: flex;
            align-items: center;
            gap: .3rem;
            background-color: $dark;
            border-radius: .75rem;
            border-bottom-right-radius: .3rem;
            padding: .55rem 1rem;
            margin-right: 1rem;
            z-index: 34234234;
        }

        // &::before {
        //     background-color: $gray-600;
        //     display: block;
        //     position: absolute;
        //     content: " ";
        //     height: 30px;
        //     width: 30px;
        //     border-radius: 7px;
        //     transform: skewX(-35deg);
        //     top: 0;
        //     right: .75rem;
        // }
    }
</style>