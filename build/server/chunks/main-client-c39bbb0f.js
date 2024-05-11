import { N as get_or_init_context_map } from './index2-816b92d1.js';

function getContext(key) {
  const context_map = get_or_init_context_map();
  return (
    /** @type {T} */
    context_map.get(key)
  );
}
function setContext(key, context) {
  const context_map = get_or_init_context_map();
  context_map.set(key, context);
  return context;
}

export { getContext as g, setContext as s };
//# sourceMappingURL=main-client-c39bbb0f.js.map
