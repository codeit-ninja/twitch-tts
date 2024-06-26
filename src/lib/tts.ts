export default class TTS {
    public ctx: AudioContext;

    public queue: AudioBuffer[] = [];

    public current: AudioBuffer | null = null;

    public isPlaying = false;

    public constructor() {
        this.ctx = new AudioContext()
    }

    add( audio: AudioBuffer ) {
        this.queue.push( audio )
    }

    play() {
        if( this.current || this.queue.length === 0 ) {
            return;
        }

        this.current = this.queue.at(0) as AudioBuffer;

        const player = this.ctx.createBufferSource()

        player.buffer = this.current;
        player.start(0);
        player.connect(this.ctx.destination)
        
        player.addEventListener( 'ended', () => {
            this.current = null 
            this.queue.shift()
        })
    }

    listen() {
        setInterval(this.play.bind(this), 250)
    }

    destroy() {
        this.queue = [];
        this.current = null;
    }
}