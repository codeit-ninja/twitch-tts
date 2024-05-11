const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.1YzVFVdc.js","app":"_app/immutable/entry/app.Ls6sXvqn.js","imports":["_app/immutable/entry/start.1YzVFVdc.js","_app/immutable/chunks/entry.7ZxbtElJ.js","_app/immutable/chunks/runtime.CFl1NsvJ.js","_app/immutable/entry/app.Ls6sXvqn.js","_app/immutable/chunks/runtime.CFl1NsvJ.js","_app/immutable/chunks/render.ghOspvTV.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/main-client.X9p070dd.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-25d1174f.js')),
			__memo(() => import('./chunks/1-a7a7678d.js')),
			__memo(() => import('./chunks/2-e519274a.js')),
			__memo(() => import('./chunks/3-c1813022.js')),
			__memo(() => import('./chunks/4-257edc41.js')),
			__memo(() => import('./chunks/5-7fbc796d.js')),
			__memo(() => import('./chunks/6-87eb6673.js')),
			__memo(() => import('./chunks/7-f54730f3.js')),
			__memo(() => import('./chunks/8-94cbe16e.js')),
			__memo(() => import('./chunks/9-05e3fc46.js')),
			__memo(() => import('./chunks/10-8816e2a1.js'))
		],
		routes: [
			{
				id: "/_",
				pattern: /^\/_\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/_/chat-overlay",
				pattern: /^\/_\/chat-overlay\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/_/dashboard",
				pattern: /^\/_\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/_/text-to-speech",
				pattern: /^\/_\/text-to-speech\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/auth/token",
				pattern: /^\/auth\/token\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/overlay/chat/[token]",
				pattern: /^\/overlay\/chat\/([^/]+?)\/?$/,
				params: [{"name":"token","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
