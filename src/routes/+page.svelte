<script lang="ts">
    import TTS from '$lib/tts';
    import tmi from 'tmi.js';

    let channel = $state('fknoobscoh')
    let log = $state<string[]>([])

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

            // TODO: Ignore bot messages
            if( tags.username?.toLowerCase() === 'fknoobscoh' ) {
                // return;
            }

            if( tags.username?.toLowerCase() === 'cohopponentbot' ) {
                return;
            }

            fetch(`https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${tags.username} said. ${message}`)
                .then(data => data.arrayBuffer())
                .then(arrayBuffer => tts.ctx.decodeAudioData(arrayBuffer))
                .then(audio => tts.add(audio))
        })
    }
</script>
<div class="container">
    <div class="box">
        <form on:submit|preventDefault={join}>
            <input type="text" placeholder="Channel name" bind:value={channel} />
            <button type="submit">Join</button>
        </form>
    </div>
    <div class="box scroll">
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