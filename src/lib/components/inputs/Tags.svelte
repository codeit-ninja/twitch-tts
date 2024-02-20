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

    let isTagging = $state(false);
    let tagKeyword = $state('');
    let tagsByKeyword = $derived( tags.filter( tag => tag.startsWith( tagKeyword ) ) );
    let selectedTags = $state<string[]>([]);

    const insertTag = ( tag: string ) => {
        contentEditable.select( 1, contentEditable.currentTextNode.textContent!.length -1 );
        contentEditable.insert( document.createTextNode( tag ) );
        contentEditable.moveCaret( contentEditable.currentTextNode.textContent!.length )

        dropdownElement.hide();
    }

    onMount( async () => {
        const { Dropdown } = await import( 'bootstrap' );
        const { ContentEditable } = await import( '$lib/client/lib/ContentEditable' );

        dropdownElement = new Dropdown( inputElement! );
        contentEditable = new ContentEditable( inputElement );

        contentEditable.addListener('change', (ce) => {
            value = ce.value;

            const matches: string[] = [];
            const regex = (value as string).matchAll( /{([a-z_.0-9\[\]]+)}/g );
            
            for( const match of regex ) {
                if( tags.includes( match[1] ) ) {
                    matches.push( match[1] );
                }
            }

            selectedTags = matches;
        });

        contentEditable.addListener('keyup', (event, ce) => {
            if( event.key === '{' ) {
                ce.currentTextNode.appendData('}');
                ce.moveCaret(1);
                ce.insert( document.createTextNode( '\u00A0' ) );

                ce.moveCaret(-2);
                ce.select(ce.currentCaretOffset - 2, ce.currentCaretOffset);
                ce.wrap( document.createElement( 'span' ) );
                ce.moveCaret(-1);

                isTagging = true;
            }
            

            if( event.key === 'ArrowRight' ) {
                if( ce.caretChar.left && ce.caretChar.left.char === '}' ) {
                    // Insert empty element if user deleted it
                    // Otherwise user is stuck inside the span element.
                    if( ! ce.caretChar.right ) {
                        ce.currentTextNode.parentElement!.insertAdjacentText('afterend', '\u00A0');
                    }
                    
                    isTagging = false;
                    ce.moveCaret(1);
                }
            }

            if( ce.currentTextNode.parentElement?.nodeName === 'SPAN' ) {
                isTagging = true;
                tagKeyword = contentEditable.currentTextNode.parentElement!.textContent!.replace(/[\{\}]/g, '');
            } else {
                isTagging = false;
            }
        })
    })

    $effect(() => {
        if( isTagging ) {
            dropdownElement?.show();
        } else {
            dropdownElement?.hide();
        }
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
        style="resize: vertical;"
    ></div>
    <ul class="dropdown-menu">
        {#each tagsByKeyword as tag}
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
{#each selectedTags as tag, i}
    <input
        type="hidden"
        class="form-control"
        value={ tag }
        name="{ tagsName }[{ i }]"
    />
{/each}
{#if description}
    <div class="form-text">{ description }</div>
{/if}