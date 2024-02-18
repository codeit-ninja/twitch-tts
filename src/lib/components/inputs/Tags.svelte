<script lang="ts">
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

    let isTagging = $state(false);
    let tagKeyword = $state<string>('');
    let selectedTags = $state<string[]>([]);
    let dropdown = $state<Dropdown>();
    let inputElement = $state<HTMLDivElement>();
    let availableTags = $derived( tags.filter( tag => tag.startsWith( tagKeyword.replace('$', '') ) ) );

    const id = uniqueId('tags-input-');
    
    const getRangeAndSelection = () => {
        const selection = window.getSelection()!;
        const range = selection.getRangeAt( 0 )

        return {
            selection,
            range
        }
    }

    const tagging = ( event: KeyboardEvent ) => {
        if ( event.key === '{' ) {
            const { selection, range } = getRangeAndSelection();

            // Prevent default behavior of inserting the '$' character
            event.preventDefault();
            
            // Create a new span element
            const span = document.createElement( "span" );
            span.textContent = "{}";

            // Insert the span element into the contenteditable div
            range.deleteContents();
            range.insertNode(span);

            // Move the cursor inside the span element
            range.setStart( span.firstChild!, 1 );
            range.setEnd( span.firstChild!, 1 );

            selection.removeAllRanges();
            selection.addRange( range );

            dropdown?.show();
        }
    }

    const insertTag = ( tag: string ) => {
        const { selection, range } = getRangeAndSelection();
        const span = range.commonAncestorContainer.parentElement!;
        const startIndex = span.textContent!.indexOf('{');
        const endIndex = span.textContent!.indexOf('}');
        const noBreakNode = document.createTextNode(" ");

        console.log(span.nextSibling?.textContent)

        if( span.nextSibling?.textContent !== ' ' ) {
            span.parentNode!.insertBefore( noBreakNode, span.nextSibling );
        }
        
        range.setStart( span.firstChild!, startIndex + 1 ); // Start after the opening bracket
        range.setEnd( span.firstChild!, endIndex ); // End before the closing bracket

        range.deleteContents();
        range.insertNode( document.createTextNode( tag ) );

        selection.removeAllRanges();
        
        range.setStartAfter( span.nextSibling! );
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);

        isTagging = false;
    }

    const handleCaretMovement = ( event: KeyboardEvent ) => {
        const { selection, range } = getRangeAndSelection();
        const currentNode = range.startContainer;
        const caretOffset = range.startOffset;
        const previousChar = currentNode.textContent?.charAt(caretOffset - 1);

        if( currentNode.parentElement?.tagName === 'SPAN' ) {
            isTagging = true;
        } else {
            isTagging = false;
        }

        if( event.key === 'Backspace' || event.key === 'ArrowLeft' ) {
            if( previousChar === '}' ) {
                range.setStart( currentNode, caretOffset - 1 );
                range.setEnd( currentNode, caretOffset - 1 );
                range.collapse(false);

                // Remove all ranges from the selection and add the new range
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }

        if (event.key === 'ArrowRight') {

            // Check if the character before the caret is }
            if (previousChar === '}') {
                let breakElement: ParentNode | ChildNode | null | undefined = currentNode.parentNode?.nextSibling;
                
                if( ! breakElement ) {
                    breakElement = currentNode.parentNode!;
                }

                if( breakElement?.textContent !== ' ' || breakElement?.textContent === undefined ) {
                    const noBreakNode = document.createTextNode(" ");
                    breakElement = breakElement?.parentNode?.insertBefore( noBreakNode, breakElement.nextSibling )
                }
                
                if (breakElement) {
                    // Create a new range and set it to the &NoBreak; element
                    range.setStartAfter( breakElement );
                    range.collapse(false);

                    // Remove all ranges from the selection and add the new range
                    selection.removeAllRanges();
                    selection.addRange(range);

                    // Prevent the default right arrow key behavior
                    event.preventDefault();

                    isTagging = false;
                }
            }
        }
    }

    const setValue = () => {
        if( isTagging ) {
            const { selection } = getRangeAndSelection();
            const text = selection.focusNode?.parentElement?.textContent?.replace( '{', '' ).replace( '}', '' );

            if( ! text  ){
                return;
            }

            tagKeyword = text;
        } else {
            tagKeyword = '';
        }

        value = inputElement!.innerText;

        const matches: string[] = [];
        const regex = (value as string).matchAll( /{([a-z_.0-9\[\]]+)}/g );

        for( const match of regex ) {
            if( tags.includes( match[1] ) ) {
                matches.push( match[1] );
            }
        }

        selectedTags = matches;
    }

    onMount( async () => {
        const { Dropdown } = await import( 'bootstrap' );

        dropdown = new Dropdown( inputElement! );
    })

    $effect(() => {
        if( isTagging ) {
            dropdown?.show();
        } else {
            dropdown?.hide();
        }
        
        setValue();
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
        onkeydown={ tagging }
        onkeyup={ handleCaretMovement }
        oninput={ () => setValue() }
        role="textbox"
        aria-placeholder="Write the message here"
        tabindex="0"
    />
    <ul class="dropdown-menu">
        {#each availableTags as tag}
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
<!-- <div class="dropdown dropdown-tags">
    <input
        type="text"
        class="form-control"
        bind:this={ toggle }
        bind:value
        onkeyup={ getTags }
        {placeholder}
        {disabled}
        {name}
        {id}
        {...rest}
    />
    <ul class="dropdown-menu">
        {#each availableTags as tag}
            <li>
                <span role="button" class="dropdown-item" onclick={ () => addTag( tag ) }>${ tag }</span>
            </li>
        {/each}
    </ul>
</div> -->
{#if description}
    <div class="form-text">{ description }</div>
{/if}