<script lang="ts">
    import type { CSSVariableField } from "$lib/client/editor/CSSVariable";
    import Color from "../inputs/Color.svelte";
    import Range from "../inputs/Range.svelte";
    
    let { setting } = $props<{
        setting: CSSVariableField
    }>();

    let value = $state( setting.value );

    $effect(() => {
        console.log(setting)
    })
</script>

{#if setting.type === 'color'}
    <Color label={ setting.label } name={ setting.variable } width="full" value={ setting.value } />
{/if}
{#if setting.type === 'range'}
    <Range 
        label={ setting.label } 
        bind:value={ value }
        name={ setting.variable } 
        min={ setting.min }
        max={ setting.max } 
        step={ setting.step } 
        unit={ setting.unit }
        width="full" 
    />
{/if}