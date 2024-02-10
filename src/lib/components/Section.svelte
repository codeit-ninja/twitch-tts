<script lang="ts">
    import type { MaterialSymbol } from 'material-symbols';
    import type { Snippet } from 'svelte';

    const { title, icon, children } = $props<{
        title: string;
        children?: Snippet;
        icon?: MaterialSymbol;
    }>();
</script>
<section>
    <h6>
        <span class="material-symbols-rounded">{ icon }</span>
        {#if icon}
            <span>{ title }</span>
        {/if}
    </h6>
    {#if children}
        {@render children()}
    {/if}
</section>