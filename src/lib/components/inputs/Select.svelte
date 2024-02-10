<script lang="ts" generics="T extends Record<string, any>">
    import { uniqueId } from 'lodash-es'
    
    let { value, width = 'md', label, disabled = false, description, options, optionLabel } = $props<{
        value: any;
        label?: string;
        description?: string;
        width?: 'sm' | 'md' | 'lg' | 'full'
        disabled?: boolean;
        options: T[];
        optionLabel: keyof T;
    }>()

    const id = uniqueId('select-input-')
</script>
<div class="row">
    <div
        class:col-12={width === 'full'}
        class:col-md-8={width === 'lg'}
        class:col-md-6={width === 'md'}
        class:col-md-4={width === 'sm'}
    >
        {#if label}
            <label class="form-label" for={id}>{ label }</label>
        {/if}
        <select
            class="form-select"
            bind:value
            {id}
            {disabled}
        >
            {#each options as option}
                <option value={option}>{option[optionLabel]}</option>
            {/each}
        </select>
    </div>
    <div class="col-12">
        {#if description}
            <div class="form-text">{ description }</div>
        {/if}
    </div>
</div>