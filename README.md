# Cybernetics Library index

Single page application built in Vue for indexing and displaying book data and generating bookmarks.

Draws book data from a google spreadsheet.

## Project setup
```
npm install
```

NPM version I'm using is 6.12.0

This application requires Google sheets API integration.

When logged into your chosen Google account, create a new project in the Developer dashboard
https://developers.google.com/sheets/api/quickstart/js#step_1_turn_on_the

Make a .env file in the root directory and enter these variables with your new CLIENT ID and API KEY

```
VUE_APP_GOOGLEAPI_ID=xxx.apps.googleusercontent.com
VUE_APP_GOOGLEAPI_KEY=xxx
```

To authenticate requests from your local dev environment or live hosted app, you will need to add those URLS in the Google developers console:

https://console.developers.google.com

Go into your project, click credentials, and click OAuth client. Add to the list of URIs

```
localhost:8000 (or whatever port you are using locally)
https://myliveurl.com
```

The sheets api will only respond to requests from URIs you add here.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
