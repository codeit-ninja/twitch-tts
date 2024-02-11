<script lang="ts">
    import type { MaterialSymbol } from "material-symbols";

    const { label, variant = 'primary', outline, type = 'button', align = 'start', icon } = $props<{
        label: string;
        variant?: 'primary' | 'secondary' | 'danger' | 'success';
        outline?: boolean;
        type: 'button' | 'submit' | 'reset'
        align?: 'start' | 'end'
        icon?: MaterialSymbol;
    }>();
</script>
<div class="row mt-4 justify-content-{ align }">
    <div class="col-auto">
        {#if icon}
            <button {type} class="d-flex align-items-center gap-3 btn btn-{ outline ? `outline-${variant}` : variant }" on:click>
                <span class="material-symbols-rounded">{ icon }</span>
                <span>{ label }</span>
            </button>
        {:else}
            <button {type} class="btn btn-{ outline ? `outline-${variant}` : variant }">{ label }</button>
        {/if}
    </div>
</div>