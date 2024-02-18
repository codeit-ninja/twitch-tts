<script lang="ts">
    import CSSVariable, { type CSSVariableField } from "$lib/client/editor/CSSVariable";
    import Editor from "$lib/components/Editor.svelte";
    import Form from "$lib/components/Form.svelte";
    import Section from "$lib/components/Section.svelte";
    import Color from "$lib/components/inputs/Color.svelte";
    import Range from "$lib/components/inputs/Range.svelte";
    import SettingsField from "$lib/components/toolbar/SettingsField.svelte";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { createRoot, onMount } from "svelte";
    import { compile } from 'svelte/compiler'

    let settings = $state<CSSVariableField[]>([
        {
            variable: '--message-bg-color',
            type: 'color',
            label: 'Message background color',
            value: '#000000'
        },
        {
            variable: '--message-color',
            type: 'color',
            label: 'Message color',
            value: '#ffffff'
        },
        {
            variable: '--message-padding-x',
            type: 'range',
            label: 'Message padding x',
            value: '1',
            min: 0,
            max: 5,
            step: .1,
            unit: 'rem'
        },
        {
            variable: '--message-padding-y',
            type: 'range',
            label: 'Message padding y',
            value: '.5',
            min: 0,
            max: 5,
            step: .1,
            unit: 'rem'
        }
    ]);

    let host = $state<HTMLDivElement>();
    
    onMount( async () => {
        const request = await fetch('/chat.html');
        const response = await request.text();

        const shadow = host!.attachShadow({ mode: 'open' });
        shadow.innerHTML = response;
    } );

    const enhance: SubmitFunction = ({ formData }) => {
        console.log(Object.fromEntries( formData.entries() ))
    }
</script>
<div class="site">
    <div class="site--toolbar">
        <Form {enhance} method="POST">
            <Section title="Settings" icon="tune">
                {#each settings as setting, i}
                    {#if setting.type === 'color'}
                        <Color label={ setting.label } name={ setting.variable } width="full" value={ setting.value } />
                    {/if}
                    {#if setting.type === 'range'}
                        <Range 
                            label={ setting.label } 
                            bind:value={ setting.value }
                            name={ setting.variable } 
                            min={ setting.min }
                            max={ setting.max } 
                            step={ setting.step } 
                            unit={ setting.unit }
                            width="full" 
                        />
                    {/if}
                {/each}
            </Section>

            <button class="btn btn-secondary" type="submit">Save</button>
        </Form>
    </div>
    <div class="site--editor" bind:this={host}></div>
</div>