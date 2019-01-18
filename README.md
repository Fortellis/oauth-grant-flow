

This is a simple react application with a login and logout button demonstrating the oAuth Implicit Flow.

To run the App

You’ll need to have Node 8.4.0 or later on your local development machine

    npm install
    config.json file can be changed with respective clientId, login base url and redirect_uri
    npm start

Open http://localhost:3000 to view it in the browser.

redirect_uri - Redirect URI is added as a Callback URL while registering the app with Fortellis. Registration form contains Callback URL (optional) field.
