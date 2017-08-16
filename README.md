# Event Gateway Example

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This example showcases how to develop and deploy Serverless applications using the [Event Gateway](https://github.com/serverless/event-gateway) as the central hub and broker, orchestrating event flows across decoupled services.

1. [General](#general)
1. [Step by Step Guide](#step-by-step-guide)
    1. [Getting Started with the Users Service](#getting-started-with-the-users-service)
    1. [Subscribing to Custom Events](#subscribing-to-custom-events)
    1. [Error Handling with Event Gateway System Events](#error-handling-with-event-gateway-system-events)
    1. [Going Multi-Cloud with Google Cloud Functions](#going-multi-cloud-with-google-cloud-functions)
1. [Workflows](#workflows)
1. [Development Experience](#development-experience)
1. [Deploy](#deploy)
1. [Resources](#resources)

## General

The Event Gateway allows you to provide HTTP endpoints as well as Pub/Sub functionality into a single event-driven experience. This example uses the `serverless run` command by the Serverless Framework providing developers with a seamless development experience.

This example contains multiple services. Each of them can be run separately to develop an individual service, but also together at the same time to test the integration between multiple services.

## Step by Step Guide

### Getting Started with the Users Service

To get started cd into the [services/users](https://github.com/serverless/event-gateway-example/tree/master/services/users) service and run

```
serverless run
```

This spins up a process downloading and running the Event Gateway as well as emulating the function users-register defined in `serverless.yml`.

The function is listening to an HTTP event at the path `/users` with the method `POST`. You can test the endpoint by sending an HTTP request to receive a valid session:

```
curl -X POST -d '{ "email": "test@example.com" }' --header "Content-Type: application/json" http://localhost:4000/users
```

In the `serverless run` terminal session you will see that the user-registered function triggers the `user.registered` event which we will use in the next step.

```
Event Gateway  Event 'http' received
Serverless     Function 'users-register' triggered by event 'http'
Event Gateway  Event 'user.registered' received
Serverless     Function 'users-register' finished
```

### Subscribing to Custom Events

Tutorial coming soon …

### Error Handling with Event Gateway System Events

Tutorial coming soon …

### Going Multi-Cloud with Google Cloud Functions

Tutorial coming soon …

## Deploy

Currently work in progress and you can expect this section to be completed soon. Production ready deployment is one of the highest priorities of the Serverless team. Please reach out to us if you are interested to run the Event Gateway on-premise or use a hosted solution.

## Events

A list of all the events used in this application:

- http
- user.registered
- user.clicked
- gateway.info.functionError

## Resources

- [Event Gateway](https://github.com/serverless/event-gateway)
- [Serverless Framework](https://github.com/serverless/serverless)
- [Serverless Development Kit (aka FDK)](https://github.com/serverless/fdk)
