# Event Gateway Example

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

A application with a simple user registration workflow, showcasing Event Gateway as the central hub and broker, orchestrating event flows across decoupled services.

1. [Events](#events)
1. [Services](#services)
1. [Workflows](#workflows)
1. [Development Experience](#development-experience)
1. [Deploy](#deploy)
1. [Resources](#resources)

## Events

This is a list of all the events used in this application:

- user.registered
- user.clicked
- gateway.info.functionError

## Services

In the [/services](https://github.com/serverless/event-gateway-example/tree/master/services) directory you can find all the services used by this application.

- [users](https://github.com/serverless/event-gateway-example/tree/master/services/users)
- [emails](https://github.com/serverless/event-gateway-example/tree/master/services/emails)
- [crm](https://github.com/serverless/event-gateway-example/tree/master/services/crm)
- [analytics](https://github.com/serverless/event-gateway-example/tree/master/services/analytics)
- [error](https://github.com/serverless/event-gateway-example/tree/master/services/error)

## Workflows

**Users service**
- An user registers via the HTTP endpoint `/users`
  - User data is saved to a database (mocked)
  - An event `user.created` is emitted
- The user data is fetched via the HTTP endpoint `/users/{id}`

**The Event Gateway**
- receives the `user.created` event
- invokes the subscribing function `sendWelcomeEmail`

**Email service**
- A welcome email is sent via the `sendWelcomeEmail` function
- An event `email.sent` is emitted
- The service exposes a HTTP endpoint `/email`

## Development Experience

In this case, the experience starts from the framework. It will be the most enticing case for our existing users. The framework introduces a new command `serverless run` that enables this experience. There will be no need for setting up anything.  

The `serverless run` command will:

- Start a local copy of the Event Gateway
- Start a local copy of the Local Emulator
- Services will be automatically *deployed* to the Local Emulator
- All of the functions that have event mappings will be *registered* automatically.

The application only needs to *subscribe* to appropriate events and `emit` events as needed.

**Note**: The framework also has a new command `serverless emit` for emitting events.

### Getting Started

1. Get the `serverless-run` branch as documented in this [issue](https://github.com/serverless/serverless/pull/4034).
2. Set up the [Users service](./services/users-services/README.md) and the [Email service](./services/email-services/README.md).
3. Enjoy the awesomeness...

### Cloud Experience

In this case, you will be deploying your services to the cloud provider of choice, and run an independent instance of the Event Gateway. This is sort of the On-Prem experience for Event Gateway, with deployments on the cloud.

#### Event Gateway

Run a local copy of event gateway as per [instructions](https://github.com/serverless/event-gateway#running-locally).

#### Backend Services

Set up the [Users service](./services/users-services/README.md) and the [Email service](./services/email-services/README.md).

#### Frontend UI

Set up the [frontend UI](./frontend/README.md).

### Application Execution

The following steps simulate performing actions via an UI.

#### Register an User

**Note**: Based on the deployments, replace the endpoint in the following calls.

```
curl -X POST \
  https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/prod/users \
  -H 'content-type: application/json' \
  -d '{"user":{"name":"Your Name", "email":"your@email.com"}}'
```

Keep an eye on the event gateway logs. You should see the `user.created` event being received and the corresponding function being called.

## Deploy

Currently work in progress and you can expect this section to be completed soon. Production ready deployment is one of the highest priorities of the Serverless team. Please reach out to us if you are interested to run the Event Gateway on-premise or use a hosted solution.

## Resources

- [Event Gateway](https://github.com/serverless/event-gateway)
- [Serverless Framework](https://github.com/serverless/serverless)
- [Serverless Development Kit (aka FDK)](https://github.com/serverless/fdk)
