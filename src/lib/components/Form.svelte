<script lang="ts">
    import { enhance as enh } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { Snippet } from 'svelte';

    type Props = {
        children: Snippet;
        enhance: SubmitFunction;
        action?: string;
        method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    }

    let { children, method, action, enhance } = $props<Props>();
</script>

<form {method} {action} use:enh={enhance}>
    {@render children()}
</form>