import { E as create_anchor, K as head, G as slot, k as bind_props, l as pop, L as attr, M as stringify, I as store_get, J as unsubscribe_stores, h as push } from './index2-816b92d1.js';
import { u as useCredentialsStore, a as useTtsConfigStore, b as useUserStore } from './store-d2261f1f.js';
import { p as page } from './stores-c9452d21.js';
import './main-client-c39bbb0f.js';
import './client-a19d47e8.js';
import './exports-4ef2d035.js';

function Menu($$payload, $$props) {
  push(false);
  const $$store_subs = {};
  $$payload.out += `<ul class="nav flex-column gap-3"><li class="nav-item"><a${attr(
    "class",
    `nav-link ${stringify([
      store_get($$store_subs, "$page", page).route.id === "/_/dashboard" ? "active" : ""
    ].filter(Boolean).join(" "))}`,
    false
  )} href="/_/dashboard">Dashboard</a></li> <li class="nav-item"><a${attr(
    "class",
    `nav-link ${stringify([
      store_get($$store_subs, "$page", page).route.id === "/_/text-to-speech" ? "active" : ""
    ].filter(Boolean).join(" "))}`,
    false
  )} href="/_/text-to-speech">Text-to-speech</a></li> <li class="nav-item"><a${attr(
    "class",
    `nav-link ${stringify([
      store_get($$store_subs, "$page", page).route.id === "/_/chat-overlay" ? "active" : ""
    ].filter(Boolean).join(" "))}`,
    false
  )} href="/_/chat-overlay">Chat overlay</a></li></ul>`;
  unsubscribe_stores($$store_subs);
  pop();
}
function _layout($$payload, $$props) {
  push(true);
  let { data } = $$props;
  useCredentialsStore.set(data.credentials);
  useTtsConfigStore.set(data.ttsConfig);
  useUserStore.set({ ...data.user, twitchUserId: data.twitchUserId });
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `FkNoobsCoH - Twitch TTS</title>`;
  });
  $$payload.out += `<div class="site"><div class="site--menu">${anchor}`;
  Menu($$payload);
  $$payload.out += `${anchor}</div> <main class="site--main">${anchor_1}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor_1}</main></div>`;
  bind_props($$props, { data });
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-2bd4c59a.js.map
