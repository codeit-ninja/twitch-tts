<script lang="ts" generics="T extends Record<string, any> | string = Record<string, any>">
    import type { HTMLSelectAttributes } from 'svelte/elements';

    import { uniqueId } from 'lodash-es'
    
    let { value, name, label, disabled = false, description, options, optionLabel, optionValue, required = false, ...rest } = $props<{
        value?: any;
        name: string;
        label?: string;
        description?: string;
        disabled?: boolean;
        options: T[];
        optionLabel?: keyof T;
        optionValue?: keyof T;
        required?: boolean;
        rest?: any[];
    } & HTMLSelectAttributes>()

    const id = uniqueId('select-input-')
</script>
{#if label}
    <label class="form-label" for={id}>{ label }</label>
{/if}
<select
    class="form-select"
    bind:value
    {name}
    {id}
    {disabled}
    {required}
    {...rest}
>
    {#each options as option}
        <option value={ optionValue ? option[optionValue] : option }>{ optionLabel ? option[optionLabel] : option }</option>
    {/each}
</select>
{#if description}
    <label class="form-check-label" for={id}>{ description }</label>
{/if}