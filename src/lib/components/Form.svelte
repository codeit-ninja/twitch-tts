<script lang="ts">
    import { enhance as enh } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { Snippet } from 'svelte';
    import type { HTMLFormAttributes } from 'svelte/elements';

    type Props = {
        children: Snippet;
        enhance: SubmitFunction;
        action?: string;
        method: 'POST' | 'GET' | 'PUT' | 'DELETE';
        rest?: HTMLFormAttributes;
    } & HTMLFormAttributes;

    let { children, method, action, enhance, ...rest } = $props<Props>();
</script>

<form {method} {action} use:enh={enhance} {...rest}>
    {@render children()}
</form>