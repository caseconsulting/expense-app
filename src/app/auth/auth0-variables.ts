interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'w9Ih4cZX8Plry47ZuoAcbnwGEG4hFeZx',
  domain: 'consultwithcase.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
