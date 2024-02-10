export const createUserStore = () => {
    let state = $state<App.Locals['user']>();

    return {
        get state() { return state },
        getUser: () => Object.assign( {}, state ),
        setUser: ( user: App.Locals['user'] ) => state = user
    }
}