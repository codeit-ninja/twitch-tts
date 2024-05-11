import { E as create_anchor, l as pop, k as bind_props, L as attr, M as stringify, H as escape, O as ensure_array_like, h as push } from './index2-816b92d1.js';
import { b as useUserStore } from './store-d2261f1f.js';
import eventemitter3 from 'eventemitter3';

function Widget($$payload, $$props) {
  push(true);
  const { title, icon, children } = $$props;
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<div class="widget"><div class="widget--header"><h3${attr("class", `widget--title ${stringify([!!icon ? "widget--title--icon" : ""].filter(Boolean).join(" "))}`, false)}>${anchor}`;
  if (icon) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<span class="material-symbols-rounded">${escape(icon)}</span>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor} ${escape(title)}</h3></div> <div class="widget--content">${anchor_1}`;
  children($$payload);
  $$payload.out += `${anchor_1}</div></div>`;
  bind_props($$props, { title, icon, children });
  pop();
}
const PUBLIC_CLIENT_ID = "67kqvxzgx6pvdyjlrkbmdty1kns90v";
class EventSub extends eventemitter3 {
  /**
   * The connected session
   * 
   * @see https://dev.twitch.tv/docs/eventsub/handling-websocket-events/#welcome-message
   */
  session;
  /**
   * This URL can change when the twitch eventsub server is swapped
   * 
   * @see https://dev.twitch.tv/docs/eventsub/handling-websocket-events/#reconnect-message
   */
  url = "wss://eventsub.wss.twitch.tv/ws";
  /**
   * The socket connection
   */
  wss;
  /**
   * Current socket state
   */
  state = "CLOSED";
  constructor() {
    super();
  }
  async connect() {
    return new Promise((resolve, reject) => {
      this.wss = new WebSocket(this.url);
      this.wss.addEventListener("open", (socket) => {
        this.state = "OPEN";
        this.createEvents();
        resolve(socket);
      });
      this.wss.addEventListener("error", (socket) => {
        this.state = "CLOSED";
        reject(socket);
      });
    });
  }
  createEvents() {
    if (!this.wss) {
      return;
    }
    this.wss.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (this.isEvent(data, "notification")) {
        this.fireEvent(data.metadata.subscription_type, data.payload.event);
      }
      if (this.isEvent(data, "session_welcome")) {
        this.session = data.payload.session;
      }
    });
  }
  fireEvent(type, data) {
    const events = {
      "channel.chat.message": () => this.emit("CHANNEL:CHAT:MESSAGE", data),
      "channel.channel_points_custom_reward_redemption.add": () => this.emit("CHANNEL:CHANNEL_POINTS_CUSTOM_REWARD_REDEMPTION:ADD", data)
    };
    events[type]();
  }
  isEvent(data, type) {
    return data.metadata.message_type === type;
  }
  isSubscription(data, type) {
    return data.metadata.subscription_type === type;
  }
  async createSubscriptions() {
    this.subscribe("channel.chat.message");
    this.subscribe("channel.channel_points_custom_reward_redemption.add");
  }
  async subscribe(type) {
    if (!this.session) {
      return;
    }
    const { twitchUserId, accessToken } = useUserStore.get();
    const payload = {
      type,
      version: "1",
      condition: {
        broadcaster_user_id: "37516578",
        user_id: twitchUserId
      },
      transport: {
        method: "websocket",
        session_id: this.session.id
      }
    };
    return await fetch("https://api.twitch.tv/helix/eventsub/subscriptions", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": PUBLIC_CLIENT_ID
      }
    });
  }
}
function ChatMessage($$payload, $$props) {
  push(true);
  const { data } = $$props;
  console.log(data.badges);
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(data.message.fragments);
  $$payload.out += `<div class="element--chat--message svelte-1os8a3d svelte-1os8a3d"><span class="svelte-1os8a3d">${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const fragment = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    const anchor_2 = create_anchor($$payload);
    const anchor_3 = create_anchor($$payload);
    $$payload.out += `${anchor_1}${anchor_2}`;
    if (fragment.type === "emote") {
      $$payload.out += "<!--ssr:if:true-->";
      $$payload.out += `<img${attr("src", `https://static-cdn.jtvnw.net/emoticons/v2/${fragment.emote.id}/default/dark/1.0`, false)}${attr("alt", fragment.text, false)}>`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
    }
    $$payload.out += `${anchor_2} ${anchor_3}`;
    if (fragment.type === "text") {
      $$payload.out += "<!--ssr:if:true-->";
      $$payload.out += `${escape(fragment.text)}`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
    }
    $$payload.out += `${anchor_3}${anchor_1}`;
  }
  $$payload.out += `${anchor}</span></div>`;
  bind_props($$props, { data });
  pop();
}
function WidgetStreamChat($$payload, $$props) {
  push(true);
  const { title, icon } = $$props;
  const messages = [];
  const eventSub = new EventSub();
  eventSub.on("CHANNEL:CHAT:MESSAGE", (message) => {
    messages.push(message);
    console.log(messages);
  });
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Widget($$payload, {
    title,
    icon,
    children: ($$payload2, $$slotProps) => {
      const anchor_1 = create_anchor($$payload2);
      const each_array = ensure_array_like(messages);
      $$payload2.out += `<div class="widget--stream--chat svelte-dfwx7y">${anchor_1}`;
      for (let $$index = 0; $$index < each_array.length; $$index++) {
        const message = each_array[$$index];
        const anchor_2 = create_anchor($$payload2);
        const anchor_3 = create_anchor($$payload2);
        $$payload2.out += `${anchor_2}${anchor_3}`;
        ChatMessage($$payload2, { data: message });
        $$payload2.out += `${anchor_3}${anchor_2}`;
      }
      $$payload2.out += `${anchor_1}</div>`;
    }
  });
  $$payload.out += `${anchor}`;
  bind_props($$props, { title, icon });
  pop();
}
function _page($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  WidgetStreamChat($$payload, { title: "Stream chat", icon: "notes" });
  $$payload.out += `${anchor}`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-dc4cebb7.js.map
