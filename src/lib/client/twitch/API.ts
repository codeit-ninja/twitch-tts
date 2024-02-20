export default class API {
    constructor(
        public url = 'https://api.twitch.tv/helix',
        public token: string 
    ) {}
}