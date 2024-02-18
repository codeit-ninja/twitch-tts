export type Trigger<T extends keyof Subscriptions = keyof Subscriptions> = {
    type: T;
    name: string;
    description: string;
    fields: string[];
}

export const triggers: Trigger[] = [
    {
        type: 'channel.chat.message',
        name: 'Channel Chat Message',
        description: 'User sends a message into chat.',
        fields: ['chatter_user_name', 'message.text', 'channel_points_custom_reward_id'],
    },
    {
        type: 'channel.channel_points_custom_reward_redemption.add',
        name: 'Channel Points Custom Reward Redemption',
        description: 'A viewer has redeemed a custom channel points reward.',
        fields: ['user_name', 'user_input', 'status', 'reward.id', 'reward.prompt', 'reward.cost', 'reward.title']
    }
]

export const conditions = [
    'any',
    'contains',
    'startsWith',
    'equals',
    'RegEx'
]

export const actions = [
    {
        type: 'tts',
        name: 'Text to Speech'
    },
    {
        type: 'say',
        name: 'Write message to chat'
    },
    {
        type: 'http',
        name: 'Make a HTTP request',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        body: null
    }
]