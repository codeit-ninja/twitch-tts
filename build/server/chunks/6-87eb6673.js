import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

const load = async ({ locals }) => {
  const ttsConfig = await prisma.ttsConfig.findFirst({
    where: { userId: locals.user.userId }
  });
  return {
    ttsConfig
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-dc4cebb7.js')).default;
const server_id = "src/routes/_/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/6.9kG6rRHX.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/runtime.CFl1NsvJ.js","_app/immutable/chunks/render.ghOspvTV.js","_app/immutable/chunks/each.XM42tCkC.js","_app/immutable/chunks/store.Z4QFliSE.js","_app/immutable/chunks/main-client.X9p070dd.js"];
const stylesheets = ["_app/immutable/assets/6.YelRlAby.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-87eb6673.js.map
