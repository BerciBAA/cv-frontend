import {
  provideKeycloak,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  withAutoRefreshToken,
  AutoRefreshTokenService,
  UserActivityService,
} from 'keycloak-angular';
import { environment } from '../environments/environment';

const localhostCondition =
  createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i,
  });

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: environment.KEYCLOAK_URL,
      realm: environment.KEYCLOAK_REALM,
      clientId: environment.KEYCLOAK_CLIENT_ID,
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
      redirectUri: window.location.origin + '/',
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 1000,
      }),
    ],
    providers: [
      AutoRefreshTokenService,
      UserActivityService,
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [localhostCondition],
      },
    ],
  });
