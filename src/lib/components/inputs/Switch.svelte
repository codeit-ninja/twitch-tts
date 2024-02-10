<script lang="ts">
    import { uniqueId } from 'lodash-es'
    
    let { value, width = 'md', label, disabled = false, description } = $props<{
        value: boolean;
        label: string;
        description?: string;
        width?: 'sm' | 'md' | 'lg' | 'full'
        disabled?: boolean;
    }>()

    const id = uniqueId('switch-input-')
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
        <div class="form-check form-switch">
            <input 
                class="form-check-input" 
                type="checkbox" 
                role="switch"
                checked={value === true}
                bind:value
                {disabled}
                {id}
            />
            {#if description}
                <label class="form-check-label" for={id}>{ description }</label>
            {/if}
        </div>
    </div>
</div>