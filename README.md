# Event Gateway Example

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This example showcases how to develop and deploy Serverless applications using the [Event Gateway](https://github.com/serverless/event-gateway) as the central hub and broker, orchestrating event flows across decoupled services.

1. [General](#general)
1. [Step by Step Guide](#step-by-step-guide)
    1. [Getting Started setting up an HTTP endpoint](#getting-started-setting-up-an-http-endpoint)
    1. [Subscribing to Custom Events](#subscribing-to-custom-events)
    1. [Error Handling with Event Gateway System Events](#error-handling-with-event-gateway-system-events)
    1. [Going Multi-Cloud with Google Cloud Functions](#going-multi-cloud-with-google-cloud-functions)
1. [Events](#events)
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

Tutorial coming soon …

## Events

A list of all the events used in this application:

- http
- user.registered
- user.clicked
- gateway.info.functionError

## Deploy

Currently work in progress and you can expect this section to be completed soon. Production ready deployment is one of the highest priorities of the Serverless team. Please reach out to us if you are interested to run the Event Gateway on-premise or use a hosted solution.

## Resources

- [Event Gateway](https://github.com/serverless/event-gateway)
- [Serverless Framework](https://github.com/serverless/serverless)
- [Serverless Development Kit (aka FDK)](https://github.com/serverless/fdk)
