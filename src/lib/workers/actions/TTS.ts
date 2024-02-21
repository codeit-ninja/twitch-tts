class TTS {
    /**
     * Audio files to play in queue
     */
    public queue: string[] = [];

    public playing = false;

    constructor() {
        setInterval( this.next.bind( this ), 100 );
    }

    /**
     * Add new TTS message to queue
     * 
     * @param message   
     * @param engine    - The polly engine we want to use {@link https://docs.aws.amazon.com/polly/latest/dg/API_SynthesizeSpeech.html#API_SynthesizeSpeech_RequestSyntax}
     * @param voiceId   - The voice character we want to use {@link https://docs.aws.amazon.com/polly/latest/dg/API_SynthesizeSpeech.html#API_SynthesizeSpeech_RequestSyntax}
     */
    public async add( message: string, engine: string, voiceId: string ) {
        const request = await fetch(`/api/v1/tts`, {
            method: 'POST',
            body: JSON.stringify( { message, voiceId, engine  } )
        });
        const blob = await request.blob();

        this.queue.push( URL.createObjectURL( blob ) );
    }

    /**
     * Plays the next audio in queue
     */
    public next() {
        if( this.playing || this.queue.length === 0 ) {
            return;
        }

        postMessage( { type: 'tts.play', url: this.queue.shift() } );
    }
}

export const tts = new TTS();