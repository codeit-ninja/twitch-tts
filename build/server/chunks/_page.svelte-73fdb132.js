import { k as bind_props, l as pop, h as push } from './index2-816b92d1.js';

function _page($$payload, $$props) {
  push(true);
  const { count } = $$props;
  $$payload.out += `<div><button class="btn btn-primary">Click me</button> What is going on?!!?!?</div>`;
  bind_props($$props, { count });
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-73fdb132.js.map
