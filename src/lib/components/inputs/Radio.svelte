<script lang="ts" generics="T extends string">
    import { uniqueId } from 'lodash-es'
    
    let { value, name, width = 'full', label, disabled = false, options, description } = $props<{
        value?: T;
        name: string;
        label?: string;
        description?: string;
        width?: 'sm' | 'md' | 'lg' | 'full'
        disabled?: boolean;
        options: T[];
    }>();
    
    const id = uniqueId('radio-input-')
</script>

{#if label}
    <label class="form-label d-block mb-3" for={id}>{ label }</label>
{/if}
{#each options as option, i}
    <div class="form-check form-check-inline">
        <input 
            class="form-check-input" 
            type="radio"
            value={option}
            bind:group={value}
            {disabled}
            {name}
            id={`${id}-${i}`}
        />
        <label class="form-check-label" for={`${id}-${i}`}>
            { option }
        </label>
    </div>
{/each}
{#if description}
    <div class="form-text">{ description }</div>
{/if}