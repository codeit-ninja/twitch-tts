<script lang="ts">
    import '$lib/patch';
    import { useCredentialsStore, useTtsConfigStore, useUserStore } from '$lib/store';
    import Menu from '$lib/components/Menu.svelte';
    import { onMount } from 'svelte';
    import TriggersWorker from '$lib/workers/triggers.js?worker';

    let { data } = $props()
    let audio: HTMLAudioElement;

    useCredentialsStore.set( data.credentials );
    useTtsConfigStore.set( data.ttsConfig );
    useUserStore.set( { ...data.user, twitchUserId: data.twitchUserId } );

    onMount( async () => {
        const triggersWorker = new TriggersWorker({ name: 'triggers' });
        const workerPostMessageData = {
            type: 'init',
            triggers: data.triggers,
            user: useUserStore.get()
        }

        triggersWorker.postMessage( JSON.parse(JSON.stringify(workerPostMessageData)) );
        triggersWorker.onmessage = (e) => {
            if( e.data.type === 'tts.play' ) {
                if( ! audio ) {
                    return;
                }

                audio.src = e.data.url;
                audio.play();
            }
        }

        audio!.addEventListener( 'playing', () => triggersWorker.postMessage( { type: 'tts.playing' } ) );
        audio!.addEventListener( 'ended', () => triggersWorker.postMessage( { type: 'tts.ended' } ) );
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
        <audio bind:this={audio}></audio>
    </main>
</div>