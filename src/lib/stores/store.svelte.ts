export const createStore = <T extends Record<string, any> | null>( initial: T | null = null ) => {
    let state = $state<T | null>( initial );

    return {
        get state() { return state },
        get: () => Object.assign( {}, state ),
        set: ( newState: T | null ) => state = newState
    }
}