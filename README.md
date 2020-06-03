# DreamFactory Example React Application

There are two ways to interact with this application.

## Installing the Application Inside DreamFactory

TODO: Add section about how to install this application via the DreamFactory administration console.

## Configuring the Application Locally

Every DreamFactory instance includes a SQLite database exposed through an API named `db`. To view this API, login to your DreamFactory instance, navigate to the `Services` tab, and select the `db` service.

### Creating a Role and API Key

Talk about creating a role for `db` service here and corresponding API key.

- In the admin console, click the Roles tab then click Create in the left sidebar.
- Enter a name for the role and check the Active box.
- Go to the Access tab.
- Add a new entry under Service Access (you can make it more restrictive later).
    - set Service = All
    - set Component = *
    - check all HTTP verbs under Access
    - set Requester = API
- Click Create Role.

### Configuring the Users Service

- Click the Services tab, then edit the user service. Go to Config and enable Allow Open Registration.
- Set the Open Reg Role Id to the name of the role you just created.
- Make sure Open Reg Email Service Id is blank, so that new users can register without email confirmation.
- Save changes.

### Adding Your DreamFactory URL and API Key

Next, you'll want to specify your DreamFactory instance's URL and API key. To do so, copy `config.js.example` to `config.js`, and update the following fields:

* `INSTANCE_URL`:
* `APP_API_KEY`:

### Using the Application

Application users will need to first register before interacting with the address book. These accounts are managed inside the DreamFactory `Users` tab. For security purposes, user registration is disabled by default therefore you'll need to login to your DreamFactory instance, navigate to the `Users` tab, click `Config`, and enable the `Allow Open Registration` tab.

To start the application, run this command:

    $ yarn start

Next, open your browser and navigate to `http://localhost:3000/`. Click the `Register` button to create a new account. 

