# Event Gateway Example

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This example showcases how to develop and deploy Serverless applications using the [Event Gateway](https://github.com/serverless/event-gateway) as the central hub and broker, orchestrating event flows across decoupled services.

1. [General](#general)
1. [Step by Step Guide](#step-by-step-guide)
    1. [Getting Started setting up an HTTP endpoint](#getting-started-setting-up-an-http-endpoint)
    1. [Subscribing to Custom Events](#subscribing-to-custom-events)
    1. [Error Handling with Event Gateway System Events](#error-handling-with-event-gateway-system-events)
    1. [Going Multi-Cloud with Google Cloud Functions](#going-multi-cloud-with-google-cloud-functions)
1. [Events](#list-of-all-events)
1. [Deploy](#deploy)
1. [Resources](#resources)

## General

The Event Gateway allows you to provide HTTP endpoints as well as Pub/Sub functionality into a single event-driven experience. This example uses the `serverless run` command by the Serverless Framework providing developers with a seamless development experience.

This example contains multiple services. Each of them can be run separately to develop an individual service, but also together at the same time to test the integration between multiple services.

## Install

1. Make sure to have the Serverless Framework installed via `npm install -g serverless` and you are logged into the Serverless Platform by running `serverless login`.
2. Clone down the repository and run `npm install` in the root directory. This command runs `npm install` in the frontend app and each backend service.

## Step by Step Guide

### Getting Started setting up an HTTP endpoint

To get started cd into the users service at  [services/users](https://github.com/serverless/event-gateway-example/tree/master/services/users) and run

```bash
serverless run
```

This will emulate the function `register` locally. In addition it downloads, runs and configures the Event Gateway to invoke the function every time a request to HTTP endpoint `/users` is triggered with the method `POST`. You can test the endpoint by sending an HTTP request to  register a user and receive a valid session:

```bash
curl -X POST -d '{ "email": "test@example.com" }' --header "Content-Type: application/json" http://localhost:4000/users
```

In the `serverless run` terminal session you will see that the user-registered function triggers the `user.registered` event which we will use in the next step.

```bash
Event Gateway  Event 'http' received
Serverless     Function 'users-register' triggered by event 'http'
Event Gateway  Event 'user.registered' received
Serverless     Function 'users-register' finished
```

### Subscribing to Custom Events

Next up open another terminal and cd into the directory of the emails service at [services/emails](https://github.com/serverless/event-gateway-example/tree/master/services/emails). There also run

```bash
serverless run
```

This will register the function `sendWelcomeEmail` and subscribe it to the custom event `user.registered`. Details can be found in your serverless-run process of the users service. By now you have have two services running connected to one Event Gateway.

If you register another user now by running

```bash
curl -X POST -d '{ "email": "test2@example.com" }' --header "Content-Type: application/json" http://localhost:4000/users
```

This time the workflow is extended by

```bash
Serverless     Function 'emails-sendWelcomeEmail' triggered by event 'user.registered'
Event Gateway  Event 'email.sent' received
Serverless     Function 'emails-sendWelcomeEmail' finished
```

This event driven architecture allowed us to extend the existing functionality with very little effort.

While this demonstrated how to test the integration between multiple service you can also run and test the emails service alone. For a better experience testing custom events the Serverless Framework supports the emit command. Give it a try by running:

```bash
serverless emit -n=user.registered -d='{ "id": 42, "session": "xxxxx", "email": "test3@example.com" }'
```

### Error Handling with Event Gateway System Events

The Event Gateway provides the system event `gateway.info.functionError` which is triggered every time a functions fails.

In order to spin up a function that throws an error you can spin up the crm service at [services/crm](https://github.com/serverless/event-gateway-example/tree/master/services/crm) using:

```bash
serverless run
```

It registers the function `addUserToCrm` and subscribes it to `user.registered`. After emitting the event the workflow should include:

```bash
Event Gateway  Event 'user.registered' received
Serverless     Function 'crm-addUserToCrm' triggered by event 'user.registered'
Serverless     Function failed due to an error
Event Gateway  Event 'gateway.info.functionError' received
```

You can subscribe and act on such system events. The errors service at [services/errors](https://github.com/serverless/event-gateway-example/tree/master/services/errors) subscribes to `gateway.info.functionError`. Once again initialize it with `serverless run` and emit the `user.registered` event to see how the `alertAdmin` is invoked

```bash
Event Gateway  Event 'gateway.info.functionError' received
Serverless     Function 'errors-alertAdmin' triggered by event 'gateway.info.functionError'
Serverless     Function 'errors-alertAdmin' finished:
```

### Going Multi-Cloud with Google Cloud Functions

The Event Gateway itself is designed in a way to operate across multiple cloud providers. In our application we leverage this opportunity to deploy two service running Google Cloud Functions using Google's Vision API as well as Google's BigQuery.

#### Analyzing Images with the Vision API

First you need to get an API and project key from a project that has the Cloud Vision API enabled.

##### Setup the Vision Service

1. Go to the [Cloud Vision API](https://console.cloud.google.com/apis/api/vision.googleapis.com/overview) section of the GCP console. Hit "Enable" to enable Cloud Vision for your project.

2. Go to the [Credentials view](https://console.cloud.google.com/apis/credentials) in the GCP Console. Hit "Create credentials" and choose "API key". Copy and paste the key into [services/vision/config.json](https://github.com/serverless/event-gateway-example/tree/master/services/vision/config.json).

3. Retrieve the project id and set `PROJECT_ID` in the `config.json` file.

##### Usage

Next up open a new terminal and go to [services/vision/](https://github.com/serverless/event-gateway-example/tree/master/services/vision/) and run:

```bash
serverless run
```

It registers the function `annotateUser` and subscribes it to `user.registered`. After emitting the event this function will fetch the user's Gravatar based on the email address and analyze it with the Vision API.

Once completed the function will emit the event `user.annotated`. The event can be used by any function subscribing to it from any cloud provider.

#### Sending Data to BigQuery

Our application emits `user.clicked` events directly from the front-end. To test this run the front-end, log in and click one of the buttons. Once up and running the analytics service listens to these events and sends them to BigQuery for further analysis.

##### Setup the Analytics Service

In the next steps you need to retrieve a JSON credentials file with access to BigQuery.

1. Go to the Google APIs [Credentials console](https://console.developers.google.com/projectselector/apis/credentials). Select your project.

1. Go to the [Google APIs Library](https://console.developers.google.com/apis/library) page, and click on the [BiqQuery API](https://console.developers.google.com/apis/api/bigquery-json.googleapis.com/overview) link to make sure the API is enabled for your project.

1. Click `Create Credentials` and choose `Service account key`.

1. In the Service Account dropdown, choose `New service account`. Give it a name. In the Role box, go to BigQuery and select BigQuery Admin.

1. Use a JSON key type and hit 'Create'. It will download a JSON file to your computer. Move it to the directory [services/analytics/](https://github.com/serverless/event-gateway-example/tree/master/services/analytics/) as the file name `credentials.json`.

1. Update the project name in the `config.json` file in the [services/analytics/](https://github.com/serverless/event-gateway-example/tree/master/services/analytics/) directory with your project name.

##### Usage

Next up open a new terminal and go to [services/analytics/](https://github.com/serverless/event-gateway-example/tree/master/services/analytics/) and run:

```bash
node setup.js # setup the BigQuery table
serverless run
```

Then open another terminal, cd into [frontend/](https://github.com/serverless/event-gateway-example/tree/master/frontend/) and run:

```bash
npm start
```

This will open your browser and visit http://localhost:3000. Register with an email and click one of the buttons.

In the terminal running the Event Gateway you will recognize a `user.clicked` event was received. This is the case, because the event was directly emitted from the browser using the [Serverless Development Kit (aka FDK)](https://github.com/serverless/fdk).

##### Using BigQuery

Go to the [BigQuery Console](https://bigquery.cloud.google.com/welcome). Make sure you're in the right project.

Useful queries:

Show the 1000 most recent events with event name, timestamp, email (if it exists in data), and full data object:

```
SELECT
  event,
  receivedAt,
  JSON_EXTRACT(data, '$.email') AS email,
  data
FROM
  [serverless-emit:emit_demo.test_events]
ORDER BY receivedAt DESC
LIMIT
  1000
```

Congratulations! You explored the whole example application.

Please reach out to us in the issues or via email in case you have questions or suggestions for improvement.

## List of all Events

A list of all the events used in this application:

- http
- user.registered
- user.clicked
- user.annotated
- email.sent
- gateway.info.functionError

## Deploy

Currently work in progress and you can expect this section to be completed soon. Production ready deployment is one of the highest priorities of the Serverless team. Please reach out to us if you are interested to run the Event Gateway on-premise or use a hosted solution.

## Resources

- [Event Gateway](https://github.com/serverless/event-gateway)
- [Serverless Framework](https://github.com/serverless/serverless)
- [Serverless Development Kit (aka FDK)](https://github.com/serverless/fdk)
