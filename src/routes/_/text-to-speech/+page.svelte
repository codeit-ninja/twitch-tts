<script lang="ts">
    import type { Voice } from "@aws-sdk/client-polly";
    import type { SubmitFunction, error } from "@sveltejs/kit";

    import Button from "$lib/components/Button.svelte";
    import Form from "$lib/components/Form.svelte";
    import Section from "$lib/components/Section.svelte";
    import Radio from "$lib/components/inputs/Radio.svelte";
    import Select from "$lib/components/inputs/Select.svelte";
    import Switch from "$lib/components/inputs/Switch.svelte";
    import Input from "$lib/components/inputs/Text.svelte";
    import { useUserStore } from "$lib/store.js";

    const { user } = useUserStore.get();
    const { data } = $props();

    let enabled = $state(!!data.defaults?.enabled); 
    // @ts-expect-error unknown JSON scheme by prisma
    let selectedVoiceId = $state<Voice['Id']>(data.defaults?.voice?.id); 
    let selectedVoice = $derived<Voice>( data.voices.find( voice => voice.Id === selectedVoiceId )! );

    let error = $state(false);
    let success = $state(false);

    const enhance: SubmitFunction = ({ formData }) => {

        // If TTS is disabled we need to use the default values
        if( ! enabled ) {
            formData.set( 'enabled', 'off' );
            formData.set( 'channel', user.username );
            formData.set( 'engine', 'neural' );
        }

        // Update voice to its JSON value
        formData.set( 'voice', JSON.stringify( selectedVoice ) );

        return async ({ result, update }) => {
            if( result.type === 'error' || result.type === 'failure' ) {
                return error = true;
            }

            return success = true;
		}
    }
</script>

<h1 class="site--title">Text to Speech</h1>
<Form method="POST" {enhance} action="?/saveConfig">
    {#if error}
        <div class="note note-danger" role="alert">
            Something went wrong
        </div>
    {/if}
    {#if success}
        <div class="note note-success" role="alert">
            Settings saved
        </div>
    {/if}
    
    <Section title="Settings" icon="record_voice_over">
        <Switch 
            bind:checked={ enabled }
            label="Enable TTS" 
            description="Do you want to enable Text to Speech" 
            width="full"
            name="enabled"
        />
        <Input 
            value={user.username}
            label="Twitch channel"
            disabled={ ! enabled }
            name="channel"
        />
        <Select 
            label="Voice character" 
            description="Select the voice character you like the most." 
            options={ data.voices }
            optionValue="Id"
            optionLabel="Name"
            disabled={ ! enabled }
            name="voice"
            bind:value={ selectedVoiceId }
        />
        {#if selectedVoice}
            <Radio
                label="Select voice type"
                value="neural"
                options={selectedVoice.SupportedEngines!}
                disabled={ ! enabled }
                name="engine"
            />
        {/if}
        <Button 
            variant="secondary" 
            label="Test voice settings" 
            type="button" 
            icon="brand_awareness" 
        />
        <Button 
            variant="primary" 
            label="Save settings" 
            type="submit" 
        />
    </Section>
</Form>