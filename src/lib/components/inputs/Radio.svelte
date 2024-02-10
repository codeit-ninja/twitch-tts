<script lang="ts" generics="T extends string">
    import { uniqueId } from 'lodash-es'
    
    let { value, width = 'full', label, disabled = false, options, description } = $props<{
        value: T;
        label?: string;
        description?: string;
        width?: 'sm' | 'md' | 'lg' | 'full'
        disabled?: boolean;
        options: T[];
    }>()

    console.log(options)
    const id = uniqueId('radio-input-')
</script>
<div class="row">
    <div
        class:col-12={width === 'full'}
        class:col-md-8={width === 'lg'}
        class:col-md-6={width === 'md'}
        class:col-md-4={width === 'sm'}
    >
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
                    id={`${id}-${i}`}
                />
                <label class="form-check-label" for={`${id}-${i}`}>
                    { option }
                </label>
            </div>
        {/each}
    </div>
    <div class="col-12">
        {#if description}
            <div class="form-text">{ description }</div>
        {/if}
    </div>
</div>