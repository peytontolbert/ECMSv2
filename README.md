Pinboards is an Engineering System Configuration Management System which utilizes a variety of functions to create, manipulate, and maintain a secured database.

Checkout a demo at http://pinboardz.azurewebsites.net (serverless - slow initial load time)

## Features
- Valves and piping Database server for individual project ventures
- Auth-Service Coded in C# using built-in functions with .NET core Web Api
- User-Service code in Node.js with express, Mysql, and Microsoft Azure Sql Databases
- Client: Powered in React with Redux framework
- Databases: MySQL, MongoDB(NOSQL)
- Host: Microsoft Azure Services


tldr; C#, .Net, JS, React, Redux, Mysql, NoSQL, Azure, NodeJS, HTML5, CSS




## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Installation

npm install
npm start

open a new terminal, cd backendserver/user-service
npm install
npm start

open auth-service SQLclient.sln
compile and run after configuring MongoDB database

## Requirements

- must create config.js file
- docker run -p 555:555 pinboards/pinboards:1.0

## TO DO

- update demo framework
- kubernetes setup
- cmake startup