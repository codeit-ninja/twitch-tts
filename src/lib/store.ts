import { createStore } from "./stores/store.svelte";

export const useCredentialsStore = createStore<App.Locals['credentials']>();
export const useUserStore = createStore<App.Locals['user']>();