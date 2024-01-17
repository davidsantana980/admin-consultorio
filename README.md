# Admin-consultorio - Medical Office Management System

A web-based application that simplifies the administration of medical offices. 
It allows you to keep track of your patients, their medical histories and records, and their appointments in one place.

## Features
	
-	Store patients with their personal data.
-	Store, modify and retrieve medical histories.
-	Store, modify and retrieve medical records.
-	Manage appointments for every patient.

## Technologies

-	Dynamic Interface & Client-Side Routing: I made the client dynamic by developing a SPA using React and react-router.
-	REST API Backend: I used Java Spring to make scalable API routes and avoid boilerplate code.
-	Secure API calls: I protected the API routes using the latest Spring Security configurations and a custom JWT-based authentication system.

## Installation and Usage

-	To install this application you need Java 17.
-	Restore the database from the Consultorio.sql file in the root folder.
- Run the server by using your favorite IDE to execute the main .java file in the "api" folder.
- Start the client running the `npm run dev` command from the "client" folder.
- You can start using the app with the default credentials (username "admin", password "admin"). 
