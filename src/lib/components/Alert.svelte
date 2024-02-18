<script lang="ts">
    import type { MaterialSymbol } from "material-symbols";
    import type { Snippet } from "svelte";
    import Icon from "./Icon.svelte";

    const { variant, children, icon } = $props<{
        variant: 'info' | 'success' | 'warning' | 'danger';
        children: Snippet;
        icon?: MaterialSymbol;
    }>();
</script>
<div class="alert alert-{ variant } d-flex align-items-start gap-3">
    {#if icon}
        <Icon {icon} />
    {/if}
    {@render children()}    
</div>