<script lang="ts">
    import '$lib/patch';
    import { useCredentialsStore, useTtsConfigStore, useUserStore } from '$lib/store';
    import Menu from '$lib/components/Menu.svelte';
    import { onMount } from 'svelte';
    import TriggersWorker from '$lib/workers/triggers.js?worker';

    let { data } = $props()

    useCredentialsStore.set( data.credentials );
    useTtsConfigStore.set( data.ttsConfig );
    useUserStore.set( { ...data.user, twitchUserId: data.twitchUserId } );

    onMount( async () => {
        const triggersWorker = new TriggersWorker({ name: 'triggers' });
        const workerPostMessageData = {
            type: 'INIT',
            triggers: data.triggers,
            user: useUserStore.get()
        }

        triggersWorker.postMessage( JSON.stringify( workerPostMessageData ) );
    })
</script>

<svelte:head>
    <title>FkNoobsCoH - Twitch TTS</title>
</svelte:head>

<div class="site">
    <div class="site--menu">
        <Menu />
    </div>
    <main class="site--main">
        <slot />
    </main>
</div>