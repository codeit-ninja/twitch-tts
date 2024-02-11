import type { TtsConfig } from "@prisma/client";
import { createStore } from "./stores/store.svelte";

export const useCredentialsStore = createStore<App.Locals['credentials']>();
export const useUserStore = createStore<App.Locals['user'] & { twitchUserId: string }>();
export const useTtsConfigStore = createStore<TtsConfig>( null );