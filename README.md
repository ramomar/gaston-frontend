# Gaston

Frontend for the Gaston project made with React.


<p align="center">
   <img src="https://user-images.githubusercontent.com/10622989/200959888-a9ad3d00-98e4-4431-87cd-0e4a38042680.gif" />
</p>


## Features

- User login
- Account movements by date screen
- Review movement screen
- Movement details view


## Implementation details

The app uses AWS Amplify to interface with AWS Cognito for authentication. Once the app has an access token, it is used to call the API built using AWS API gateway and Redux is used for app wide state handling.


## Development workflow

The project was setup Create React App so the workflow comes straight from the template.

#### Starting the app

In order to start the app, run `npm start` and then navigate to [http://localhost:3000](http://localhost:3000).

#### Testing the app

Run `npm test`.

#### Linting 

Run `npm lint`.
