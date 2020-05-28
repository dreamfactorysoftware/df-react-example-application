# DreamFactory Example React Application

There are two ways to interact with this application.

## Installing the Application Inside DreamFactory

TODO: Add section about how to install this application via the DreamFactory administration console.

## Configuring the Application Locally

Every DreamFactory instance includes a SQLite database exposed through an API named `db`. To view this API, login to your DreamFactory instance, navigate to the `Services` tab, and select the `db` service.

### Creating a Role and API Key

Talk about creating a role for `db` service here and corresponding API key.

For Role access be sure to select All because the application is CRUD-capable.

### Configuring the Users Service

https://share.getcloudapp.com/YEu1L9wN

### Adding Your DreamFactory URL and API Key

Next, you'll want to specify your DreamFactory instance's URL and API key. To do so, copy `config.js.example` to `config.js`, and update the following fields:

* `INSTANCE_URL`:
* `APP_API_KEY`:

### Using the Application

Application users will need to first register before interacting with the address book. These accounts are managed inside the DreamFactory `Users` tab. For security purposes, user registration is disabled by default therefore you'll need to login to your DreamFactory instance, navigate to the `Users` tab, click `Config`, and enable the `Allow Open Registration` tab.

To start the application, run this command:

    $ yarn start

Next, open your browser and navigate to `http://localhost:3000/`. Click the `Register` button to create a new account. 

