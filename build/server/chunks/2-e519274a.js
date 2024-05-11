import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

const load = async ({ locals }) => {
  const ttsConfig = await prisma.ttsConfig.findFirst(
    {
      where: { userId: locals.user.userId }
    }
  );
  return {
    credentials: locals.credentials,
    user: locals.user,
    ttsConfig,
    twitchUserId: locals.twitchUserId
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-2bd4c59a.js')).default;
const server_id = "src/routes/_/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.X0IjkpFN.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/runtime.CFl1NsvJ.js","_app/immutable/chunks/render.ghOspvTV.js","_app/immutable/chunks/store.Z4QFliSE.js","_app/immutable/chunks/stores.hd1kWRYm.js","_app/immutable/chunks/entry.7ZxbtElJ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-e519274a.js.map
