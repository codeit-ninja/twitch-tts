import '@aws-sdk/polly-request-presigner';
import { Polly } from '@aws-sdk/client-polly';
import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

let client = null;
let voices = null;
const getClient = (credentials) => {
  if (!client) {
    client = new Polly({ region: "us-east-1", credentials });
  }
  return client;
};
const getVoices = async (credentials) => {
  if (voices) {
    return voices;
  }
  const availableVoices = await getClient(credentials).describeVoices({ Engine: "neural" });
  return voices = availableVoices.Voices.filter((voice) => voice.LanguageCode === "en-GB" || voice.LanguageCode === "en-US");
};
const load = async ({ locals }) => {
  const voices2 = await getVoices(locals.credentials);
  const defaults = await prisma.ttsConfig.findFirst({ where: { userId: locals.user.userId } });
  return {
    voices: voices2,
    defaults
  };
};
const actions = {
  saveConfig: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = {
      voice: JSON.parse(formData.get("voice")),
      channel: formData.get("channel"),
      enabled: formData.get("enabled") === "on",
      engine: formData.get("engine"),
      user: {
        connect: {
          id: locals.user.userId
        }
      }
    };
    try {
      const result = await prisma.ttsConfig.upsert({
        create: data,
        update: data,
        where: {
          userId: locals.user.userId
        }
      });
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        data,
        error
      };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-b6030809.js')).default;
const server_id = "src/routes/_/text-to-speech/+page.server.ts";
const imports = ["_app/immutable/nodes/7.3jsciDQg.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/runtime.CFl1NsvJ.js","_app/immutable/chunks/render.ghOspvTV.js","_app/immutable/chunks/entry.7ZxbtElJ.js","_app/immutable/chunks/each.XM42tCkC.js","_app/immutable/chunks/store.Z4QFliSE.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-f54730f3.js.map
