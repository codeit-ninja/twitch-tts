<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = {
        submit: ( form: HTMLFormElement ) => void;
        children: Snippet;
    }

    let form = $state<HTMLFormElement>() as HTMLFormElement;
    let { submit, children } = $props<Props>();
</script>

<form on:submit|preventDefault={() => submit( form )} bind:this={form}>
    {@render children()}
</form>