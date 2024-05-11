<script lang="ts">
    import type { MaterialSymbol } from "material-symbols";
    import type { HTMLButtonAttributes } from "svelte/elements";

    const { label, variant = 'primary', outline, type = 'button', align = 'start', icon, ...rest } = $props<{
        label?: string;
        variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'transparent';
        outline?: boolean;
        type: 'button' | 'submit' | 'reset'
        align?: 'start' | 'end'
        icon?: MaterialSymbol;
        rest?: HTMLButtonAttributes
    } & HTMLButtonAttributes>();
</script>
{#if icon}
    <button 
        class="d-flex align-items-center gap-3 btn btn-{ outline ? `outline-${variant}` : variant }"
        on:click
        { type }
        { ...rest }
    >
        <span class="material-symbols-rounded">{ icon }</span>
        {#if label}
            <span>{ label }</span>
        {/if}
    </button>
{:else}
    <button
        class="btn btn-{ outline ? `outline-${variant}` : variant }"
        { type }
        { ...rest }
    >{ label }</button>
{/if}