<script lang="ts">    
    import { useCredentialsStore, useTtsConfigStore, useUserStore } from '$lib/store';
    import Menu from '$lib/components/Menu.svelte';

    let { data } = $props()

    useCredentialsStore.set( data.credentials );
    useTtsConfigStore.set( data.ttsConfig );
    useUserStore.set( { ...data.user, twitchUserId: data.twitchUserId } );
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