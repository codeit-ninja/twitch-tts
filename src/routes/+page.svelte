<script lang="ts">
    import TTS from '$lib/tts';
    import tmi from 'tmi.js';

    let channel = $state('fknoobscoh')
    let log = $state<string[]>([])
    let layout = $state('{tags.username} said {message}')

    let tts: TTS;
    let client: tmi.Client;

    const join = async () => {
        if (client) {
            tts.destroy();
            await client.disconnect();
        }

        tts = new TTS()
        client = new tmi.Client({
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
            // Usualy those are bots :|
            if( tags.username?.includes('bot') ) {
                return;
            }

            if( message.includes('http://') || message.includes('https://') ) {
                return;
            }

            message = message.replaceAll('%', 'percent')
            
            fetch(`https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${message}`)
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
            <!-- <div>
                <label for="msg-layout">Message layout</label>
                <input type="text" id="msg-layout" style="width: 100%;" bind:value={layout} />
            </div> -->
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