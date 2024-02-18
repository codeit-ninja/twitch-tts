<script lang="ts">
    import { uniqueId } from 'lodash-es'
    
    let { value, min, max, step, unit, name, width = 'md', label, disabled = false, description } = $props<{
        value?: string;
        min?: number;
        max?: number;
        step?: number;
        name: string;
        label?: string;
        unit?: string;
        description?: string;
        width?: 'sm' | 'md' | 'lg' | 'full'
        disabled?: boolean;
    }>()

    const id = uniqueId('range-input-');
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
        <div class="form-control-range d-flex align-items-center gap-3 mt-2">
            <input 
                type="range"
                class="form-range"
                bind:value
                {min}
                {max}
                {step}
                {disabled}
                {name}
                {id}
            />
            <span style="display: block;position: relative;top: -1px;min-width: 80px;text-align: end;">{ value } { unit }</span>
        </div>
    </div>
    <div class="col-12">
        {#if description}
            <div class="form-text">{ description }</div>
        {/if}
    </div>
</div>