export const createStore = <T extends Record<string, any>>() => {
    let state = $state<T>();

    return {
        get state() { return state },
        get: () => Object.assign( {}, state ),
        set: ( newState: T ) => state = newState
    }
}