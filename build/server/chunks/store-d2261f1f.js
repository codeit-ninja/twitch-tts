const createStore = (initial = null) => {
  let state = initial;
  return {
    get state() {
      return state;
    },
    get: () => Object.assign({}, state),
    set: (newState) => state = newState
  };
};
const useCredentialsStore = createStore();
const useUserStore = createStore();
const useTtsConfigStore = createStore(null);

export { useTtsConfigStore as a, useUserStore as b, useCredentialsStore as u };
//# sourceMappingURL=store-d2261f1f.js.map
