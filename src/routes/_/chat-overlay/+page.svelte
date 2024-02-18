<script lang="ts">
    import { createRoot, onMount } from 'svelte';
    import ChatOverlay from '$lib/components/ChatOverlay.svelte';
    import ToolbarSection from '$lib/components/toolbar/ToolbarSection.svelte';
    import FontSelector from '$lib/components/elements/FontSelector.svelte';
    // import { closeBrackets, autocompletion } from '@codemirror/autocomplete';
    // import { EditorState } from "@codemirror/state";
    // import { EditorView, keymap } from "@codemirror/view";
    // import { defaultKeymap } from "@codemirror/commands";
    // import { css } from "@codemirror/lang-css";

    let host = $state<HTMLDivElement>()!;
    let selectedFont = $state<GoogleWebFont>();
    
        type Props = {
        font: GoogleWebFont | undefined,
        css: {
            overlay: Partial<CSSStyleDeclaration>;
            container: Partial<CSSStyleDeclaration>;
        }
    }
    
    const props = $state<Props>({
        font: undefined,
        css: {
            overlay: {
                display: 'flex',
                flexDirection: 'column-reverse',
                height: '100vh',
                overflow: 'hidden',
            },
            container: {
                padding: '1rem'
            }
        }
    })

    onMount( () => {
        const shadow = host.attachShadow({ mode: 'open' });
        const component = createRoot( ChatOverlay, { target: shadow, props } );
        // let startState = EditorState.create({
        //     doc: ".chat--overlay {}",
        //     extensions: [
        //         keymap.of(defaultKeymap), 
        //         css(),
        //         autocompletion(),
        //         closeBrackets()
        //     ]
        // })

        // let view = new EditorView({
        //     state: startState,
        //     parent: host
        // })
    })

    $effect(() => {
        console.log(props);
    })
</script>
<div class="chat--overlay--builder">
    <div class="chat--overlay--builder--preview unset--site--main" bind:this={host}></div>

    <form class="chat--overlay--builder--toolbar">
        <ToolbarSection title="Body">
            <div class="mb-3">
                <label class="form-label" for="body-bg-color">Background color</label>
                <input 
                    type="color"
                    class="form-control form-control-color"
                    value="#ffffff"
                    id="body-bg-color"
                    name="body-bg-color"
                />
            </div>
        </ToolbarSection>
        <ToolbarSection title="Chat message">
            <div class="mb-3">
                <FontSelector bind:selected={props.font} />
            </div>
        </ToolbarSection>
    </form>
</div>