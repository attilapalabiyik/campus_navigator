# Campus Navigator

## Purpose
A web application that provides students with real-time navigation through the UMass Amherst campus, 
details on upcoming events, and comprehensive information about its buildings.
Our website is a prototype that includes the floor-wise information about rooms in the 
tow buildings in UMASS Amherst - Machmer Hall and Integrative Learning Centre.
Each building also has a calendar feature for rooms where events/classes take place.
The system has the following core components :

- User Authentication and Authorization : students and staff must login using their umass email ID's.
This feature has been added to maintain student profiles and it also allows them to save their favorites/
most accessed buildings and/or events.
- Navigation : Maps between buildings to help us navigate to the location of the buildings in different modes of transport.
(includes different routes for vehicles and navigation by foot)
- Building Layout : Each building has floorwise labels attached to each room number in different floors,
to indicate whether it's a classroom or office room or facility, etc.
- Events : Rooms where classes/events take place have been marked in the calendar for that specific room.
The events might be recurring weekly or a one time occurrence like an exam or workshop. The calendar includes all
the events happening in certain rooms over the FALL 2024 semester.

Our website aims to make navigation in the UMASS Amherst campus easy for students and staff and help them save 
the necessary everyday information they need, so that they do not have to spend time finding the building layout or 
availability of rooms, on top of their already busy and demanding schedules.

## Getting Started
Steps to be followed to run/host our website on your local machine :

### Prerequisites
Before you start the setup, make sure to have the following installed and running in your system :

1. **Express.js**: Download and install Express.js from [expressjs.org](https://expressjs.com/).

## Steps to run the project

1. Clone our repository to your local machine: 
git clone https://github.com/attilapalabiyik/campus_navigator.git

2. Navigate to the backend directory: 
cd backend

3. Create an environment.ts files in the backend directory and add the following Key:
export const environment = {
  mongoKey:
    " ", // Replace with your Mongo API key
  openaiKey: " ", // Replace with your OpenAI API key
};
- Obtain the API key from [OpenAI](https://openai.com/index/openai-api/).

- Visit the MongoDB website, create a new database or cluster by following the instructions 
provided in the MongoDB documentation. Note down and use the  "Connect to your application URI" for the 
database in the mongoKey parameter.

4. Install the server-side dependencies:
npm install

5. Start the backend application/server
npm run start
It will now be running on your browser on the port 'localhost:8000'

6. Open a new terminal and navigate to the frontend dirctory
cd frontend

7.  Create  an environment.ts file in the src folder and add the below content:
export const environment = {
  clientId:
    " ",  // Replace with your client ID key
  mapsId: " ", // Replace with your actual maps API key
};

- Go to the google cloud console https://console.cloud.google.com/ and select a new project.
-  In the API & services section, pick the libraries 'Google Maps JavaScript API' for the client key and 'Maps JavaScript API' for maps key.
- Enable for the appropriate API.
- After enabling the API, go to Credentials (on the left sidebar). Click Create Credentials and choose OAuth client ID.
- Once the OAuth client is created, you will get a Client ID and Client Secret.Copy the Client ID and paste it in the clientId key field.
- For the Maps Key : After enabling the API, go to Credentials. Click Create Credentials → API Key.
A new API key will be generated (You can restrict its usage to specific referrers or IP addresses for security.)
- Copy the generated API key (which would be your mapsId), and paste it into the mapsId key field.


8. Run the frontend application/client
npm install 
npm run start
The website will now be running on the port 'localhost:3000' on your browser


## Usage / Features
- User authentication : register and sign in using your UMASS email ID
- Building information : click on the respective building for location, floors and room information
- Pin or save buildings for convenience : click the heart icon on the building logo to save an view it later
- Interactive map to visualize the location of buildings and navigate to the location 
- Events in a selected room are displayed in a Calendar. Add or save events for easy access.
- A chatbot answers student queries about events in the given buildings 
(E.g - What events are there in September in N470 at the ILC?)


## The Database
The database has been created using MongoDB Atlas. There are two collections, one for the users and another collection for buildings. The buildings collection is static and has information about the Machmer Hall and ILC buildings in UMASS Amherst. The collection contains both the buildings as JSON objects with information about each floor (containting the room number, functionality and events data). The events are added as nested objects inside the building objects for respective floors. These events serve as a source for the calendar UI on our webpage. In order to recreate this database setup, create new similar JSON files or use the ones given in our repository and add it to your MongoDB cluster using Compass/VS Code.


## Demo
Video link - https://youtu.be/KmLGA1RDDUo 


## Running Tests

1. To install the required dependencies, run the following command:
npm install --save-dev jest ts-jest @types/jest supertest ts-node

2. Add test scripts in package.json:
{
  "scripts": {
    "start": "npx tsx src/app.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}

3. Run the Tests- After installing the dependencies, you can run the test cases using Jest by executing:
npm test

4. (optional) Run tests in watch mode using: 
npm run test:watch

## Authors
- Attila Palabiyik
- Indirariyadarshini Arunachalam
- Swetha Mohan
- Sanjana Reddy


## Tech Stack

**Client:** [![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]
(https://reactjs.org/)

**Server:** 
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)]
(https://expressjs.com/)
[![Typescript.js](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]
(https://www.typescriptlang.org/)

**Database:** 
[![Mongo DB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**GPT Model used for Bot**
[![GPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)](https://platform.openai.com/docs/models/gpt-4-0-turbo)
