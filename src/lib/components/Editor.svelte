<script lang="ts">
    import type { CSSVariableField } from "$lib/client/editor/CSSVariable";

    let { settings, document } = $props<{
        settings: CSSVariableField[],
        document: ShadowRoot;
    }>();

    const sheet = new CSSStyleSheet();
    document.adoptedStyleSheets.push(sheet);

    $effect( () => {
        const style = [':root', '{'];

        // Reference to keep track of changes
        for( const setting in settings ) {
            style.push( `\n\r${ settings[setting].variable }: ${ settings[setting].value };` )
        }

        style.push( '}' )

        sheet.replaceSync( style.join(' ') );
    } )
</script>