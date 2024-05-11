import { E as create_anchor, G as slot, l as pop, h as push } from './index2-816b92d1.js';

function _layout($$payload, $$props) {
  push(false);
  console.log("Authenticate");
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}`;
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-efc012b1.js.map
