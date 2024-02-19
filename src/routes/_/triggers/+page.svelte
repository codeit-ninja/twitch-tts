<script lang="ts">
    import type { SubmitFunction } from '@sveltejs/kit'
    import Form from "$lib/components/Form.svelte";
    import Section from "$lib/components/Section.svelte";
    import { triggers, conditions, actions } from '$lib/config/triggers';
    import Select from '$lib/components/inputs/Select.svelte';
    import Text from '$lib/components/inputs/Text.svelte';
    import Icon from '$lib/components/Icon.svelte';
    import Button from '$lib/components/Button.svelte';
    import { formDataToObject } from '$lib/utils';
    import Alert from '$lib/components/Alert.svelte';
    import TextToSpeech from '$lib/components/offcanvas/TextToSpeech.svelte';
    import Tags from '$lib/components/inputs/Tags.svelte';

    const { data } = $props();

    let selectedTrigger = $state<keyof Subscriptions>('channel.chat.message');
    let trigger = $derived( triggers.find( t => t.type === selectedTrigger )! )
    let selectedTriggerFields = $derived( trigger.fields );
    let triggerConditions = $state<{ type: null | '&&' | '||', field: string; filter: string; value: string }[]>([]);
    let triggerActions = $state<{ type: string; }[]>([]);
    
    const addCondition = () => {
        triggerConditions.push(
            {
                type: triggerConditions.length > 0 ? '&&' : null,
                field: selectedTriggerFields[0],
                filter: 'any',
                value: ''
            }
        )
    }

    const addAction = () => {
        triggerActions.push(
            {
                type: 'tts'
            }
        )
    }

    const enhance: SubmitFunction = ({ formData }) => {
        console.log(formDataToObject( formData ))
        console.log(formData.getAll('condition'))

        return async ({ result, update }) => {

		}
    }

    $effect(() => {
        if( triggerActions.length === 0 ) {
            addAction();
        }
    })
</script>
<h1 class="site--title">Triggers</h1>

<Form {enhance} method="POST" action="/?createTrigger" class="create-trigger">
    <Section title="Event">
        <div class="row">
            <div class="col-lg-8 d-flex align-items-center gap-4">
                <Icon icon="bolt" />
                <div class="input-group input-group-trigger">
                    <span class="input-group-text">On</span>
                    <Select
                        name="trigger"
                        bind:value={ selectedTrigger }
                        options={ triggers }
                        optionLabel="name"
                        optionValue="type"
                    />
                </div>
            </div>
            <div class="col-lg-8 ms-5 mt-2">
                <strong class="form-text">{ trigger.description }</strong>
            </div>
        </div>
    </Section>
    <Section title="Condition">
        <div class="row">
            <div class="col-lg-8">
                <Alert variant="info" icon="info_i">
                    If you dont add conditions, the trigger will always activate when the selected event occurs.
                </Alert>
            </div>
        </div>
        {#each triggerConditions as condition, i}
            <div class="trigger-condition mb-3">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="d-flex align-items-center gap-4">
                            <Icon icon="radio_button_checked" />
                            <div class="input-group input-group-trigger-condition">
                                {#if i === 0}
                                    <span class="input-group-text">
                                        If
                                    </span>
                                {:else}
                                    <div class="input-group-text">
                                        <Select
                                            name="condition[{ i }].operator"
                                            bind:value={ triggerConditions[i].type }
                                            options={ [{ name: 'OR', value: '||' }, { name: 'AND', value: '&&' }] }
                                            optionValue="value"
                                            optionLabel="name"
                                            class="form-select text-info"
                                            required
                                        />
                                    </div>
                                {/if}
                                <Select
                                    name="condition[{ i }].field"
                                    bind:value={ triggerConditions[i].field }
                                    options={ selectedTriggerFields }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8">
                        <div class="d-flex align-items-center gap-4">
                            <Icon icon="arrow_right_alt" />
                            <div class="input-group input-group-trigger-condition">
                                <div class="input-group-text">
                                    <Select 
                                        name="condition[{ i }].filter"
                                        bind:value={ triggerConditions[i].filter }
                                        options={ conditions }
                                    />
                                </div>
                                <Text
                                    name="condition[{ i }].value"
                                    bind:value={ triggerConditions[i].value }
                                    autocomplete="off"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
        <div class="row">
            <div class="col-lg-8">
                <div class="d-flex justify-content-end">
                    <button class="btn btn-dark" onclick={addCondition} type="button">Add condition</button>
                </div>
            </div>
        </div>
    </Section>
    <Section title="Action">
        {#each triggerActions as action, i}
            <div class="row">
                <div class="col-lg-8 d-flex align-items-center gap-4">
                    <Icon icon="function" />
                    <div class="d-flex flex-grow-1 gap-2">
                        <div class="input-group input-group-trigger">
                            <span class="input-group-text">Do</span>
                            <Select
                                name="action[{ i }].type"
                                bind:value={ action.type }
                                options={ actions }
                                optionLabel="name"
                                optionValue="type"
                            />
                        </div>
                        <button 
                            class="btn btn-secondary" 
                            type="button" 
                            data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvas-tts-{ i }">Edit</button>
                    </div>
                </div>
            </div>
            
            <!-- {#if action.type === 'tts'}
                <TextToSpeech index={ i } id="offcanvas-tts-{ i }" voices={ data.voices } fields={ selectedTriggerFields } />
            {/if} -->
        {/each}
        <div class="row">
            <div class="col-lg-8">
                <Tags
                    name="test"
                    tags={ selectedTriggerFields }
                    tagsName="test.tags"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <div class="d-flex justify-content-end">
                    <button class="btn btn-dark" onclick={addAction} type="button">Add action</button>
                </div>
            </div>
        </div>
    </Section>

    <Button label="Create trigger" type="submit" />
</Form>