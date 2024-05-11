import { exchangeCode } from '@twurple/auth';
import { C as CLIENT_ID, a as CLIENT_SECRET, R as REDIRECT_URI } from './private-b3289c4f.js';
import { e as error, r as redirect } from './index-16f0d8a9.js';

const load = async ({ url, cookies }) => {
  const code = url.searchParams.get("code");
  if (!code) {
    error(400, "Authentication failed");
  }
  const tokenData = await exchangeCode(CLIENT_ID, CLIENT_SECRET, code, REDIRECT_URI);
  cookies.set("token", JSON.stringify(tokenData), {
    path: "/"
  });
  redirect(302, "/auth/login");
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-1dba0034.js')).default;
const server_id = "src/routes/auth/token/+page.server.ts";
const imports = ["_app/immutable/nodes/9.mXYuvdlL.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/runtime.CFl1NsvJ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-05e3fc46.js.map
