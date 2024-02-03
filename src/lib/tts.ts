export default class TTS {
    public ctx: AudioContext;

    public queue: AudioBuffer[] = [];

    public isPlaying = false;

    public constructor() {
        this.ctx = new AudioContext()
    }

    add( audio: AudioBuffer ) {
        this.queue.push( audio )
    }

    play( audio: AudioBuffer ) {
        const player = this.ctx.createBufferSource()

        // Remove the audio from queue
        this.queue.shift()

        this.isPlaying = true;

        player.buffer = audio;
        player.start(0);
        player.connect(this.ctx.destination)
        
        player.addEventListener( 'ended', () => this.isPlaying = false )
    }

    next() {
        if( this.isPlaying ) {
            return;
        }

        const next = this.queue?.at(0)

        if( ! next ) {
            return;
        }

        console.log(this)

        this.play( next )
    }

    listen() {
        setInterval(this.next.bind(this), 250)
    }
}