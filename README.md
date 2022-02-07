# Interview Scheduler
# Description
A modern client application using the React view library. This application allows users to book, cancel and edit interviews with potiential interviewers from Monday through Friday.

# Functionality
Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
Data is persisted by the API server using a PostgreSQL database.
The client application communicates with an API server over HTTP, using the JSON format.
Jest tests are used through the development of the project.

# Technical Specifications
React
Webpack, Babel
Axios, WebSockets
Axios
Storybook, Webpack Dev Server, Jest, Testing Library
The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application [Scheduler API server application](https://github.com/ntechd/scheduler-api.git)
# Screenshots
!["Appointment form"](https://github.com/ntechd/scheduler/blob/master/docs/appointment-form.png)
!["Appointment adding"](https://github.com/ntechd/scheduler/blob/master/docs/adding-appointment.png) 
!["example"](https://github.com/ntechd/scheduler/blob/master/docs/example-appointment.png)
!["delete shown"](https://github.com/ntechd/scheduler/blob/master/docs/delete.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
