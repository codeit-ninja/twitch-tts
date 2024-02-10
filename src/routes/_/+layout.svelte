<script lang="ts">    
    import { useCredentialsStore, useUserStore } from '$lib/store';
    import Menu from '$lib/components/Menu.svelte';

    let { data } = $props()

    useCredentialsStore.set( data.credentials );
    useUserStore.set( data.user );
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