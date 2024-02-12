import type { TtsConfig, User, UserTwitchTokenData } from '@prisma/client';
import type { AwsCredentialIdentity } from '@smithy/types';
import type { HelixPrivilegedUser } from '@twurple/api';
import type { 
    EventsubSessionWelcomePayload,
    EventsubNotificationChannelChatMessagePayload,
    EventsubNotificationChannelChannelPointsCustomRewardRedemptionAddPayload
} from '$lib/client/twitch/EventSub.svelte';

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

    interface EventSubEvents {
        'SESSION': ( session: EventsubSessionWelcomePayload['session'] ) => void;
        'CHANNEL:CHAT:MESSAGE': ( message: EventsubNotificationChannelChatMessagePayload['event'] ) => void;
        'CHANNEL:CHANNEL_POINTS_CUSTOM_REWARD_REDEMPTION:ADD': ( redemption: EventsubNotificationChannelChannelPointsCustomRewardRedemptionAddPayload['event'] ) => void;
    }
}

export {};
channel.channel_points_custom_reward_redemption.add