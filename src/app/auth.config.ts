import { AuthConfig, provideAuth0 } from '@auth0/auth0-angular';

export const authConfig: AuthConfig = {
  domain: 'dev-dan42zmue7a65nbf.us.auth0.com',
  clientId: 'dRotMUVOU4xC2iamMhjgBRVrwbwCBiHE',
  authorizationParams: {
    redirect_uri: "http://localhost:4200/allHouses",
  },
};

export const authProviders = provideAuth0(authConfig);
