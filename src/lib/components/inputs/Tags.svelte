<script lang="ts">
    import type { ContentEditable } from '$lib/client/lib/ContentEditable';
    import type { Dropdown } from 'bootstrap';
    import { uniqueId } from 'lodash-es'
    import { onMount } from 'svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    
    let { value, name, tagsName, width = 'md', label, placeholder, disabled = false, description, tags, ...rest } = $props<{
        value?: string;
        name: string;
        tagsName: string;
        label?: string;
        placeholder?: string;
        description?: string;
        tags: string[];
        width?: 'sm' | 'md' | 'lg' | 'full'
        disabled?: boolean;
        rest?: any[];
    } & HTMLInputAttributes>();

    let inputElement: HTMLDivElement;
    let dropdownElement: Dropdown;
    let contentEditable: ContentEditable;
    let id = uniqueId('tags-input-');

    const insertTag = ( tag: string ) => {
        contentEditable.insert( document.createTextNode( tag ) );
        contentEditable.moveCaret( tag.length );

        dropdownElement.hide();
    }

    onMount( async () => {
        const { Dropdown } = await import( 'bootstrap' );
        const { ContentEditable } = await import( '$lib/client/lib/ContentEditable' );

        dropdownElement = new Dropdown( inputElement! );
        contentEditable = new ContentEditable( inputElement );

        contentEditable.addListener('update', (ce) => console.log(ce.value));

        contentEditable.addListener('keyup', (event, ce) => {
            if( event.key === '{' ) {
                ce.currentTextNode.appendData('}');
                ce.moveCaret(1);
                ce.insert( document.createTextNode( '\u00A0' ) );

                ce.moveCaret(-2);
                ce.select(ce.currentCaretOffset - 2, ce.currentCaretOffset);
                ce.wrap( document.createElement( 'span' ) );
                ce.moveCaret(-1);

                dropdownElement.show();
            }
            

            if( event.key === 'ArrowRight' ) {
                if( ce.caretChar.left && ce.caretChar.left.char === '}' ) {
                    // Insert empty element if user deleted it
                    // Otherwise user is stuck inside the span element.
                    if( ! ce.caretChar.right ) {
                        ce.currentTextNode.parentElement!.insertAdjacentText('afterend', '\u00A0');
                    }

                    ce.moveCaret(1);
                }
            }
        })
    })
</script>
{#if label}
    <label class="form-label d-flex align-items-center gap-2" for={id}>{ label } <code>{'{}'}</code></label>
{/if}
<div class="dropdown dropdown-tags">
    <div 
        class="form-control form-control-tags"
        bind:this={ inputElement }
        contenteditable="plaintext-only"
        role="textbox"
        aria-placeholder="Write the message here"
        tabindex="0"
    >asdasdasdasd</div>
    <ul class="dropdown-menu">
        {#each tags as tag}
            <li>
                <a role="button" class="dropdown-item" onclick={ () => insertTag( tag ) } tabindex="0" href={'#'}>{ tag }</a>
            </li>
        {/each}
    </ul>
</div>
<input
    type="hidden"
    class="form-control"
    bind:value
    { placeholder }
    { disabled }
    { name }
    { id }
    { ...rest }
/>
{#if description}
    <div class="form-text">{ description }</div>
{/if}