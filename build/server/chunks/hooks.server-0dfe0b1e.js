import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { C as CLIENT_ID, R as REDIRECT_URI } from './private-b3289c4f.js';
import { StaticAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { p as prisma } from './prisma-68db7c66.js';
import { r as redirect, e as error } from './index-16f0d8a9.js';
import '@prisma/client';

function sequence(...handlers) {
  const length = handlers.length;
  if (!length)
    return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
async function getUser(token, throwErr = true) {
  return await prisma.userTwitchTokenData[throwErr ? "findFirstOrThrow" : "findFirst"]({
    where: {
      accessToken: token
    },
    include: {
      user: true
    }
  });
}
const getCurrentUser = async (token) => {
  return await getUser(token, true);
};
const getUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email
    },
    include: {
      UserTwitchTokenData: true
    }
  });
};
const createUserByToken = async ({ accessToken, expiresIn, obtainmentTimestamp, refreshToken, scope }) => {
  const twitchUser = await getTwitchUser(accessToken);
  if (!twitchUser.email) {
    error(404, "Could not link your twitch email.");
  }
  return await prisma.userTwitchTokenData.create({
    data: {
      accessToken,
      expiresIn,
      obtainmentTimestamp,
      refreshToken,
      scope,
      user: {
        create: {
          email: twitchUser.email,
          password: "NULL",
          username: twitchUser.displayName
        }
      }
    },
    include: {
      user: true
    }
  });
};
const updateOrCreateToken = async (user, token) => {
  if (!user) {
    return await createUserByToken(token);
  }
  return await updateTokenForUser(user, token);
};
const updateTokenForUser = async ({ email, id }, { accessToken, expiresIn, obtainmentTimestamp, refreshToken, scope }) => {
  return await prisma.userTwitchTokenData.update({
    where: {
      userId: id
    },
    data: {
      accessToken,
      expiresIn,
      obtainmentTimestamp,
      refreshToken,
      scope,
      user: { connect: { email } }
    }
  });
};
const createClient = (accessToken) => new ApiClient({ authProvider: new StaticAuthProvider(CLIENT_ID, accessToken) });
const getTwitchUser = async (token) => {
  return createClient(token).users.getAuthenticatedUser(token);
};
const auth = async ({ event, resolve }) => {
  const cookie = event.cookies.get("token");
  const token = cookie ? JSON.parse(cookie) : null;
  if (!token) {
    if (event.route.id?.startsWith("/auth")) {
      return await resolve(event);
    }
    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: [
        "user:read:email",
        "chat:read",
        "chat:edit",
        "user:read:chat",
        "user:write:chat",
        "whispers:read",
        "channel:moderate",
        "channel:read:redemptions",
        "channel:manage:redemptions"
      ].join(" ")
    });
    return redirect(302, `https://id.twitch.tv/oauth2/authorize?${params.toString()}`);
  }
  const twitchUser = await getTwitchUser(token.accessToken);
  const user = await getUserByEmail(twitchUser.email);
  await updateOrCreateToken(user, token);
  event.locals.user = await getCurrentUser(token.accessToken);
  event.locals.twitchUserId = twitchUser.id;
  return await resolve(event);
};
const aws = async ({ event, resolve }) => {
  const cognitoidentity = new CognitoIdentityClient({
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: "us-east-1" }),
      identityPoolId: "us-east-1:20b7d50c-d752-4f3e-9f70-2a5335f01e92"
    })
  });
  event.locals.credentials = await cognitoidentity.config.credentials();
  const response = await resolve(event);
  return response;
};
const handle = sequence(auth, aws);

export { aws, handle };
//# sourceMappingURL=hooks.server-0dfe0b1e.js.map
