namespace EventSub {
    type SubscriptionTypes = 
        'channel.update' |
        'channel.follow' |
        'channel.ad_break.begin' |
        'channel.chat.clear' |
        'channel.chat.clear_user_messages' |
        'channel.chat.message' |
        'channel.chat.message_delete' |
        'channel.chat.notification' |
        'channel.chat_settings.update' |
        'channel.subscribe' |
        'channel.subscription.end' |
        'channel.subscription.gift' |
        'channel.subscription.message' |
        'channel.cheer' |
        'channel.raid' |
        'channel.ban' |
        'channel.unban' |
        'channel.moderator.add' |
        'channel.moderator.remove' |
        'channel.guest_star_session.begin' |
        'channel.guest_star_session.end' |
        'channel.guest_star_guest.update' |
        'channel.guest_star_settings.update' |
        'channel.channel_points_custom_reward.add' |
        'channel.channel_points_custom_reward.update' |
        'channel.channel_points_custom_reward.remove' |
        'channel.channel_points_custom_reward_redemption.add' |
        'channel.channel_points_custom_reward_redemption.update' |
        'channel.poll.begin' |
        'channel.poll.progress' |
        'channel.poll.end' |
        'channel.prediction.begin' |
        'channel.prediction.progress' |
        'channel.prediction.lock' |
        'channel.prediction.end' |
        'channel.charity_campaign.donate' |
        'channel.charity_campaign.start' |
        'channel.charity_campaign.progress' |
        'channel.charity_campaign.stop' |
        'conduit.shard.disabled' |
        'drop.entitlement.grant' |
        'extension.bits_transaction.create' |
        'channel.goal.begin' |
        'channel.goal.progress' |
        'channel.goal.end' |
        'channel.hype_train.begin' |
        'channel.hype_train.progress' |
        'channel.hype_train.end' |
        'channel.shield_mode.begin' |
        'channel.shield_mode.end' |
        'channel.shoutout.create' |
        'channel.shoutout.receive' |
        'stream.online' |
        'stream.offline' |
        'user.authorization.grant' |
        'user.authorization.revoke' |
        'user.update';

    type SubscriptionStatus = 
        'enabled' | 
        'webhook_callback_verification_pending' |
        'webhook_callback_verification_failed' |
        'notification_failures_exceeded' |
        'authorization_revoked' |
        'moderator_removed' |
        'user_removed' |
        'version_removed' |
        'beta_maintenance' |
        'websocket_disconnected' |
        'websocket_failed_ping_pong' |
        'websocket_received_inbound_traffic' |
        'websocket_connection_unused' |
        'websocket_internal_error' |
        'websocket_network_timeout' |
        'websocket_network_error';

    type GetSubscriptionsParams = {
        status?: SubscriptionStatus;
        type?: SubscriptionTypes;
        user_id?: string;
        after?: string;
    }
}