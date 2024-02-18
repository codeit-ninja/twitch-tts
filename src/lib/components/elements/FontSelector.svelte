<script lang="ts">
    import { getAvailableFonts, loadFont } from '$lib/utils';
    import { onMount } from 'svelte';

    let { value, selected } = $props<{
        selected: GoogleWebFont | undefined;
        value?: string;
    }>();

    if( ! value ) {
        value = '';
    }

    let toggle: HTMLElement;
    let allFonts: GoogleWebFont[] = [];
    let fontsBeforeSearch = $state<GoogleWebFont[]>([]);
    let fonts = $state<GoogleWebFont[]>([]);
    let start = $state( 0 );
    let end = $state( 50 );

    const loadMoreFonts = ( e?: Event ) => {

        if( e ) {
            const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLDivElement;

            if( Math.abs( scrollHeight - clientHeight - scrollTop ) > 200 ) {
                return;
            }
        }

        fonts = [ ...fonts, ...allFonts.slice( start, end ) ]
        fontsBeforeSearch = fonts;

        start = end;
        end = start + 50;

        for( const font of allFonts.slice( start, end ) ) {
            loadFont( font.family, `url( ${ font.files.regular } )` );
        }
    }

    const select = ( font: GoogleWebFont ) => {
        selected = font;
        value = font.family;
    }

    const search = () => {
        if( value!.length < 3 ) {
            fonts = fontsBeforeSearch;
            return;
        }
        
        fonts = allFonts.filter( font => font.family.toLowerCase().startsWith( value!.toLowerCase() ) )

        for( const font of fonts ) {
            loadFont( font.family, `url( ${ font.files.regular } )` );
        }
    }

    onMount( async () => {        
        allFonts = await getAvailableFonts();

        const { Dropdown } = await import( 'bootstrap' );
        const dropdown = new Dropdown( toggle );

        loadMoreFonts();
    })
</script>
<div class="dropdown element--font--selector--dropdown">
    <label class="form-label">Font family</label>
    <input 
        type="text" 
        class="form-control form-control-sm"
        data-bs-toggle="dropdown"
        style="font-family: { selected?.family };"
        bind:value
        bind:this={toggle}
        onkeyup={search}
    />
    
    {#if fonts}
        <ul class="dropdown-menu" onscroll={loadMoreFonts}>
            {#each fonts as font}
                <li>
                    <button 
                        class="dropdown-item" 
                        style="font-family: { font.family };"
                        onclick={ () => select( font ) }
                    >{ font.family }</button>
                </li>
            {/each}
        </ul>
    {/if}
</div>