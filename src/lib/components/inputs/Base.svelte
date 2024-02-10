<script lang="ts">
    import type { Snippet } from "svelte";

    const { width = "full", children } = $props<{
        width?: 'sm' | 'md' | 'lg' | 'full',
        children: Snippet;
    }>();
</script>
<div
    class:col-12={width === 'full'}
    class:col-md-8={width === 'lg'}
    class:col-md-6={width === 'md'}
    class:col-md-4={width === 'sm'}
>
    {@render children()}
</div>