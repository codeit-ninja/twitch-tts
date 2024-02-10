<script lang="ts">
    import Button from "$lib/components/Button.svelte";
import Form from "$lib/components/Form.svelte";
    import Section from "$lib/components/Section.svelte";
    import Radio from "$lib/components/inputs/Radio.svelte";
    import Select from "$lib/components/inputs/Select.svelte";
    import Switch from "$lib/components/inputs/Switch.svelte";
    import Input from "$lib/components/inputs/Text.svelte";

    const submit = (s: HTMLFormElement) => {
        console.log(formData)
    }

    let value = '';

    const { data } = $props();
    const formData = $state({
        enabled: false,
        channel: '',
        voice: data.voices[0],
        engine: 'neural'
    })
    
    $effect(() => {
        console.log(formData)
    })
</script>

<Form {submit}>
    <Section title="Settings" icon="record_voice_over">
        <Switch 
            bind:value={formData.enabled} 
            label="Enable TTS" 
            description="Do you want to enable Text to Speech" 
            width="full" 
        />
        <Input 
            bind:value={formData.channel} 
            label="Twitch channel" 
        />
        <Select 
            bind:value={formData.voice} 
            label="Voice character" 
            description="Select the voice character you like the most." 
            width="sm"
            options={data.voices}
            optionLabel="Name"
        />
        <Radio
            bind:value={formData.engine}
            label="Select voice type"
            options={formData.voice.SupportedEngines!}
        />
        <Button variant="secondary" label="Test voice settings" type="button" icon="brand_awareness" />
        <Button variant="primary" label="Save settings" type="submit" />
    </Section>
</Form>