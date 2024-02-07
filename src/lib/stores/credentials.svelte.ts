export const createCredentialsStore = () => {
    let state = $state<App.Locals['credentials']>();

    return {
        get state() { return state },
        getCredentials: () => Object.assign( {}, state ),
        setCredentials: ( credentials: App.Locals['credentials'] ) => state = credentials
    }
}