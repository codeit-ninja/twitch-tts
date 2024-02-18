<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    
    let { id, placement = 'left', backdrop = true, keyboard = true, scroll = false, children, ...rest } = $props<{
        id: string;
        placement?: 'left' | 'right' | 'top' | 'bottom'
        backdrop?: boolean;
        keyboard?: boolean;
        scroll?: boolean;
        children: Snippet;
        rest?: any[];
    } & HTMLAttributes<HTMLDivElement>>();
    let offcanvas = $state<HTMLDivElement>();

    onMount( async () => {
        if( ! offcanvas ) {
            return;
        }

        const { Offcanvas } = await import( 'bootstrap' );

        new Offcanvas( offcanvas, {
            backdrop,
            keyboard,
            scroll
        })
    })
</script>
<div 
    class="offcanvas"
    class:offcanvas={ rest }
    class:offcanvas-top={ placement === 'top' }
    class:offcanvas-bottom={ placement === 'bottom' }
    class:offcanvas-start={ placement === 'left' }
    class:offcanvas-end={ placement === 'right' }
    bind:this={ offcanvas }
    { id }
    { ...rest }
>
    {@render children()}
</div>