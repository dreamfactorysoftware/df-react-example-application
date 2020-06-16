# DreamFactory Example React Application

This repo contains a sample address book application made with React that demonstrates how to use the DreamFactory REST API. It includes new user registration, user login, and CRUD for related tables.
There are two ways to interact with this application. You can either import it using the DreamFactory Admin Panel or run it locally from your hard drive. In both of those cases you will need a working DreamFactory instance.

## Getting a DreamFactory instance

You can create a free [trial account](http://www.dreamfactory.com/register) or alternatively, you can download a open source version of DreamFactory [here](https://www.dreamfactory.com/downloads-interstitial/) and run your own instance.

## Installing the Application Inside DreamFactory

- Create a default role for new users and enable open registration
  - In the admin console, click the Roles tab then click Create in the left sidebar.
  - Enter a name for the role and check the Active box.
  - Click "Next" to go to the `Access tab`.
  - Add a new entry under `Service Access` (you can make it more restrictive later).
      - set `Service = All`
      - set `Component = *`
      - check all HTTP verbs under `Access`
      - set `Requester = API`
  - Click `Save`.
  - Click the `Services` tab, then edit the user service. Go to `Config`.
    - Enable `Allow Open Registration`.
    - Set the `Open Reg Role Id` to the name of the role you just created.
    - Make sure `Open Reg Email Service Id` is **blank**, so that new users can register without email confirmation.
    - Save your changes.

- Make sure you have a SQL database service named **`db`**. Most DreamFactory instances have a default `db` service for SQLite. If you don't have one, you can add it by going to the `Services` tab in the admin console and creating a new `SQLite service`. Make sure you set the name to **`db`**.

- Import the package file for the app.
  - From the Apps tab in the admin console, click Import and click `Address Book for ReactJS` in the list of sample apps. The Address Book package contains the application description, source code, **schemas**, and **sample data**.
  - Leave `storage service` and `folder` `blank`. It will use the default local file service named `files`.
  - Click the Import button. If successful, your app will appear on the Apps tab. You may have to refresh the page to see your new app in the list.

- Edit your app API key and instance URL
  - Use the file manager to edit `public/config.js` and set `APP_API_KEY` to the key for your new app. The API key is shown in the app details in the Apps tab of the admin console. Leave `INSTANCE_URL` empty.

- Make your app files public.
  - Figure out where your app files are stored. If you used the default storage settings to import the app, it'll be the default local file service named `files`.
  - Go to the `Files` tab in the admin console. Find the folder for your app, e.g., `AddressBookForReact`.
  - Go to the Services tab in the admin console and click the `files` service. Click the `Config` tab and add the app folder name `AddressBookForReact` as a public path.
  - Save your changes.

### Using the Application

To start the application go to the `Apps` tab and click `play` next to the `Address Book for React`.

Application users will need to first register before interacting with the address book. These accounts are managed inside the DreamFactory `Users` tab. For security purposes, user registration is disabled by default therefore we had to enable the `Allow Open Registration` in the `user` service `config` tab as descirbed in the instalation process.

## Configuring the Application Locally

- First install the app inside of DreamFactory by fallowing all the steps from the previous section. This way you will set up your instance properly and create all the necessary data.
- Clone this repository. Run `yarn` (or `npm i`).
```
    $ git clone git@github.com:dreamfactorysoftware/df-react-example-application.git
    $ cd df-react-example-application
```
- Edit `public/config.js` and set `APP_API_KEY` to the key for your new app. The API key is shown in the app details in the Apps tab of the admin console.  `INSTANCE_URL` should point to your instance.
```
    window.appConfig = {
      INSTANCE_URL: 'https://<INSTANCE_NAME>.apps.dreamfactory.com',
      APP_API_KEY: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
    };
```
- Start the application with `yarn start`.
```
    $ yarn && yarn start
```
- Next, open your browser and navigate to `http://localhost:3000/`. Click the `Register` button to create a new account.

