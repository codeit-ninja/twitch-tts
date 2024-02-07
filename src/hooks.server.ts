import { error, type Handle } from '@sveltejs/kit';
import { CognitoIdentityClient, GetCredentialsForIdentityCommand } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

export const handle: Handle = async ({ event, resolve }) => {
    const cognitoidentity = new CognitoIdentityClient({
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: 'us-east-1' }),
            identityPoolId: 'us-east-1:20b7d50c-d752-4f3e-9f70-2a5335f01e92'
        }),
    });

    event.locals.credentials = await cognitoidentity.config.credentials()

    const response = await resolve(event);
    return response;
};