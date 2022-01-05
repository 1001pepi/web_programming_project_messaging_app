// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  signUp_API_URL: 'http://localhost:1337/users/',
  signIn_API_URL: 'http://localhost:1337/login/',
  contacts_API_URL: 'http://localhost:1337/contacts/',
  discussions_API_URL: 'http://localhost:1337/discussions/',
  sending_message_API_URL: 'http://proxysms.mufoca.com/api/v0/shortMessages',
  messages_API_URL: 'http://localhost:1337/messages/',
  users_API_URL: 'http://localhost:1337/users/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
