<script lang="ts">
    import { uniqueId } from 'lodash-es'
    
    let { name, checked, label, disabled = false, description } = $props<{
        name: string;
        checked: boolean;
        label: string;
        description?: string;
        width?: 'sm' | 'md' | 'lg' | 'full'
        disabled?: boolean;
    }>()

    const id = uniqueId('switch-input-')
</script>
{#if label}
    <label class="form-label d-block" for={id}>{ label }</label>
{/if}
<div class="form-check form-switch">
    <input 
        class="form-check-input" 
        type="checkbox" 
        role="switch"
        bind:checked
        {name}
        {disabled}
        {id}
    />
    {#if description}
        <label class="form-check-label" for={id}>{ description }</label>
    {/if}
</div>