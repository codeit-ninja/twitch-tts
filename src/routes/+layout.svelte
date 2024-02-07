<script lang="ts">
    import type { LayoutData } from './$types';

    // Stylesheet
    import "../sass/bootstrap.scss";
    import "../sass/app.scss";
    
    import { useCredentialsStore } from '$lib/store';

    let { data } = $props()

    useCredentialsStore.setCredentials( data.credentials );
</script>

<svelte:head>
    <title>FkNoobsCoH - Twitch TTS</title>
</svelte:head>

<slot></slot>