import { H as escape, I as store_get, J as unsubscribe_stores, l as pop, h as push } from './index2-816b92d1.js';
import { p as page } from './stores-c9452d21.js';
import './main-client-c39bbb0f.js';
import './client-a19d47e8.js';
import './exports-4ef2d035.js';

function Error($$payload, $$props) {
  push(false);
  const $$store_subs = {};
  $$payload.out += `<h1>${escape(store_get($$store_subs, "$page", page).status)}</h1> <p>${escape(store_get($$store_subs, "$page", page).error?.message)}</p>`;
  unsubscribe_stores($$store_subs);
  pop();
}

export { Error as default };
//# sourceMappingURL=error.svelte-a9de447a.js.map
