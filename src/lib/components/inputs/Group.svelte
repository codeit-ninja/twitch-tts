<script lang="ts">
    import type { Snippet } from "svelte";

    const { before, after, children } = $props<{
        before?: string | Snippet;
        after?: string | Snippet;
        children: Snippet;
    }>();

    console.log(before)
</script>
<div class="input-group">
    {#if before}
        <span class="input-group-text">{ before }</span>
    {/if}
    {@render children()}
    {#if after}
        <span class="input-group-text">{ after }</span>
    {/if}
</div>