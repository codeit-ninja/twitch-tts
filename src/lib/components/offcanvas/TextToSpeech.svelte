<script lang="ts">
    import type { Voice } from "@aws-sdk/client-polly";
    import Offcanvas from "../Offcanvas.svelte";
    import Section from "../Section.svelte";
    import Select from "../inputs/Select.svelte";
    import Radio from "../inputs/Radio.svelte";
    import Tags from "../inputs/Tags.svelte";

    let { id, index, voices, fields } = $props<{
        id: string;
        index: number;
        voices: Voice[];
        fields: string[];
    }>();

    let voice = $state<Voice>( voices[0] );
</script>
<Offcanvas { id } placement="right" class="offcanvas-text-to-speech">
    <h4 class="px-5 pt-5">Text to Speech</h4>
    <Section title="Voice settings">
        <div class="mb-4">
            <Select
                label="Character"
                name="actions[{ index }].voice"
                options={ voices }
                optionLabel="Name"
                optionValue="Id"
            />
        </div>
        <div class="mb-4">
            <Radio
                label="Type"
                value="neural"
                name="actions[{ index }].engine"
                options={ voice.SupportedEngines! }
            />
        </div>
        <div class="mb-4">
            <Tags 
                label="message"
                name="actions[{ index }].message"
                tagsName="actions[{ index }].tags"
                tags={ fields }
                autocomplete="off"
            />
        </div>
    </Section>
</Offcanvas>