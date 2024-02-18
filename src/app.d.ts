import type { User, UserTwitchTokenData } from '@prisma/client';
import type { AwsCredentialIdentity } from '@smithy/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            credentials: AwsCredentialIdentity;
            user: UserTwitchTokenData & { user: User };
            twitchUserId: string;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }

    type EventsubMetadata<EventType extends string, SubscriptionMetadata extends Record<string, any> = Record<string, any>> = {
        message_id: string;
        message_type: EventType;
        message_timestamp: string;
    } & SubscriptionMetadata;

    type EventsubMetadataSubscription<SubType extends keyof Subscriptions> = EventsubMetadata<'notification'> & {
        subscription_type: SubType;
        subscription_version: string;
    }

    type EventsubPayload<Payload> = Payload;
    type EventsubData<EventType extends string, Payload extends Record<string, any>, SubscriptionMetadata extends Record<string, any> = Record<string, any>> = {
        metadata: EventsubMetadata<EventType, SubscriptionMetadata>;
        payload: EventsubPayload<Payload>;
    }

    type EventsubSessionWelcomePayload = {
        session: {
            id: string;
            status: 'connected';
            connected_at: string;
            keepalive_timeout_seconds: number;
            reconnect_url: string | null;
        }
    }

    type EventsubSessionKeepalivePayload = {}

    type Conditions = {
        broadcaster_user_id: string;
        user_id: string;
        moderator_user_id: string;
        from_broadcaster_user_id: string;
        to_broadcaster_user_id: string;
        reward_id: string;
        client_id: string;
        conduit_id: string;
        organization_id: string;
        category_id: string;
        campaign_id: string;
        extension_client_id: string;
    }

    type EventsubNotificationPayload<SubscriptionType extends string, Condition extends Partial<Conditions>, Event extends Record<string, any>> = {
        subscription: {
            id: string;
            enabled: string;
            type: SubscriptionType;
            version: string;
            cost: number;
            condition: Condition;
            transport: {
                method: 'websocket';
                session_id: string;
            }
        }
        event: Event;
    }

    type Badge = {
        set_id: string;
        id: string;
        info: string;
    }

    type ChannelChatMessageFragmentMention = {
        user_id: string;
        user_login: string;
        user_name: string;
    }

    type ChannelChatMessageFragmentEmote = {
        emote_set_id: string;
        format: string[];
        id: string;
        owner_id: string;
    }

    type ChannelChatMessageFragments = {
        type: 'mention' | 'text' | 'emote';
        text: string;
        cheermote: string | null;
        emote: ChannelChatMessageFragmentEmote | null;
        mention: ChannelChatMessageFragmentMention | null;
    }

    type EventsubNotificationChannelChatMessagePayload = EventsubNotificationPayload<
        'channel.chat.message',
        {
            broadcaster_user_id: string,
            user_id: string
        },
        {
            broadcaster_user_id: string
            broadcaster_user_login: string
            broadcaster_user_name: string
            chatter_user_id: string
            chatter_user_login: string
            chatter_user_name: string
            message_id: string
            message: {
                text: string,
                fragments: ChannelChatMessageFragments[];
            }
            color: string,
            badges: Badge[];
            message_type: string,
            cheer: null,
            reply: any; // TODO: Figure out what type this is supposed to be
            channel_points_custom_reward_id: null
        }
    >

    type EventsubNotificationChannelChannelPointsCustomRewardRedemptionAddPayload = EventsubNotificationPayload<
        'channel.channel_points_custom_reward_redemption.add',
        {
            broadcaster_user_id: string;
            reward_id: string;
        },
        {
            id: string;
            broadcaster_user_id: string;
            broadcaster_user_login: string;
            broadcaster_user_name: string;
            user_id: string;
            user_login: string;
            user_name: string;
            user_input: string;
            status: string;
            reward: {
                id: string;
                title: string;
                cost: number;
                prompt: string;
            },
            redeemed_at: string;
        }
    >

    type Eventsub = {
        session_welcome: EventsubData<'session_welcome', EventsubSessionWelcomePayload>;
        session_keepalive: EventsubData<'session_keepalive', EventsubSessionKeepalivePayload>;
        notification: EventsubData<'notification', EventsubNotificationPayload<any, any, any>, EventsubMetadataSubscription<any>>; // unknown at this point
    }

    type Subscriptions = {
        'channel.chat.message': EventsubData<
            'notification',
            EventsubNotificationChannelChatMessagePayload,
            EventsubMetadataSubscription<'channel.chat.message'>
        >;
        'channel.channel_points_custom_reward_redemption.add': EventsubData<
            'notification',
            EventsubNotificationChannelChannelPointsCustomRewardRedemptionAddPayload,
            EventsubMetadataSubscription<'channel.channel_points_custom_reward_redemption.add'>
        >;
    }

    type GetTypeForEvent<K extends keyof Eventsub> = Eventsub[K] extends { metadata: { message_type: K } }
        ? Eventsub[K]
        : never;

    type GetTypeForSubscription<K extends keyof Subscriptions> = Subscriptions[K] extends { metadata: { subscription_type: K } }
        ? Subscriptions[K]
        : never;

    interface EventSubEvents {
        'SESSION': (session: EventsubSessionWelcomePayload['session']) => void;
        'CHANNEL:CHAT:MESSAGE': (message: EventsubNotificationChannelChatMessagePayload['event']) => void;
        'CHANNEL:CHANNEL_POINTS_CUSTOM_REWARD_REDEMPTION:ADD': (redemption: EventsubNotificationChannelChannelPointsCustomRewardRedemptionAddPayload['event']) => void;
    }

    interface GoogleWebFont {
        category: string;
        family: string;
        files: Record<string, string>;
        kind: string;
        lastModified: string;
        menu: string;
        subsets: string[];
        variants: string[];
        version: string;
    }

    interface GoogleWebFontsResponse {
        kind: string;
        items: GoogleWebFont[];
    }

    type NestedObject = {
        [key: string]: NestedObject | NestedObject[] | (object | string | boolean | number | null);
    }

    type FormDataToObjectOptions = {
        parentKey?: string;
    }

    type ObjectToFormDataOptions = {
        arrayKeyPrefix?: string;
        formData: FormData;
        parentKey?: string;
    }

    namespace PrismaJson {
        type TriggerCondition = {
            field: string;
            filter: 'contains' | 'any' | 'startsWith' | 'equals' | 'regex';
            value: string;
            operator?: '||' | '&&';
        }
    }
}

export { };