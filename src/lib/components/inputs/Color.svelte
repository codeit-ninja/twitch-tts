<script lang="ts">
    import { uniqueId } from 'lodash-es';

    let { value, name, width = 'md', label, placeholder, disabled = false, description } = $props<{
        value?: string;
        name: string;
        label?: string;
        placeholder?: string;
        description?: string;
        width?: 'sm' | 'md' | 'lg' | 'full'
        disabled?: boolean;
    }>()

    const id = uniqueId('color-input-');
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
        <div class="form-control-picker d-flex align-items-center gap-3 mt-2">
            <input 
                type="color"
                class="form-control form-control-color"
                bind:value
                {placeholder}
                {disabled}
                {name}
                {id}
            />
            <span>{ value }</span>
        </div>
    </div>
    <div class="col-12">
        {#if description}
            <div class="form-text">{ description }</div>
        {/if}
    </div>
</div>