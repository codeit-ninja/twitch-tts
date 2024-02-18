<script lang="ts">
    import { uniqueId } from 'lodash-es'
    import type { HTMLInputAttributes } from 'svelte/elements';
    
    let { value, name, width = 'md', label, placeholder, disabled = false, description, ...rest } = $props<{
        value?: string;
        name: string;
        label?: string;
        placeholder?: string;
        description?: string;
        width?: 'sm' | 'md' | 'lg' | 'full'
        disabled?: boolean;
        rest?: any[];
    } & HTMLInputAttributes>()

    const id = uniqueId('text-input-')
</script>
{#if label}
    <label class="form-label" for={id}>{ label }</label>
{/if}
<input 
    type="text"
    class="form-control"
    bind:value
    {placeholder}
    {disabled}
    {name}
    {id}
    {...rest}
/>
{#if description}
    <div class="form-text">{ description }</div>
{/if}