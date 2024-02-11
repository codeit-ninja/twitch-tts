<script lang="ts">
    import type { MaterialSymbol } from "material-symbols";
    import type { Snippet } from "svelte";

    const { title, icon, children } = $props<{
        icon?: MaterialSymbol;
        title: string;
        children: Snippet;
    }>();
</script>
<div class="widget">
    <div class="widget--header">
        <h3 class="widget--title" class:widget--title--icon={!!icon}>
            {#if icon} 
                <span class="material-symbols-rounded">
                    { icon }
                </span>
            {/if}
            { title }
        </h3>
    </div>
    <div class="widget--content">
        {@render children()}
    </div>
</div>