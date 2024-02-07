<script lang="ts">
    import type { Voice } from '@aws-sdk/client-polly';
    import { generateSpeechUrl, getVoices } from '$lib/polly';
    import { useCredentialsStore } from '$lib/store';
    import TTS from '$lib/tts';
    import { onMount } from 'svelte';
    import tmi from 'tmi.js';

    let channel = $state('fknoobscoh')
    let log = $state<string[]>([])
    let voices = $state<Voice[]>()

    const join = async () => {
        const tts = new TTS()
        const client = new tmi.Client({
            options: { debug: true },
            channels: [channel]
        })

        client.join( channel )
        client.connect().catch(console.log)

        client.on('connecting', (address, port) => {
            log.push(`NOTICE: Connecting to ${address} on ${port}`)
        })

        client.on('connected', (address, port) => {
            log.push(`SUCCESS: Successfully connected`)

            tts.listen()
        })

        client.on('join', (channel, username) => {
            log.push(`NOTICE: ${username} joined ${channel}`)
        })

        client.on('message', async ( channel, tags, message, self ) => {
            log.push(`${tags.username}: ${message}`)

            // Ignore messages if username has bot in it
            if( tags.username?.includes('bot') ) {
                return;
            }

            if( message.includes('http://') || message.includes('https://') ) {
                return;
            }

            message = message.replaceAll('%', 'percent')

            const url = await generateSpeechUrl( `${tags.username} said. ${message}` )

            fetch(url)
                .then(data => data.arrayBuffer())
                .then(arrayBuffer => tts.ctx.decodeAudioData(arrayBuffer))
                .then(audio => tts.add(audio))
        })
    }

    onMount( async () => {
        voices = await getVoices()
    })
</script>
<div class="container">
    <div class="box box-primary mt-5">
        <form on:submit|preventDefault={join}>
            <div class="row mb-3 g-1">
                <div class="col-auto">
                    <input type="text" class="form-control" placeholder="Channel name" bind:value={channel} />
                </div>
                <div class="col-auto">
                    <button type="submit" class="btn btn-primary">Join</button>
                </div>
            </div>
        </form>
    </div>
    <div class="box box-primary mt-2">
        <div class="content">
            {#each log as line}
                <p
                    class:notice={line.startsWith('NOTICE')}
                    class:success={line.startsWith('SUCCESS')}
                    class:error={line.startsWith('ERROR')}
                >
                    {line}
                </p>
            {/each}
        </div>
    </div>
</div>