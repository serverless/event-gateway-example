# Event Gateway Example

## Goals

Create an application with a simple user registration workflow, showcasing Event Gateway as the central hub and broker, orchestrating event flows across decoupled services. The services can be deployed locally or onto a cloud provider.

## Application Workflow

**Users service**
- An user registers via the HTTP endpoint `/users`
  - User data is saved to a database (mocked)
  - An event `userCreated` is emitted
- The user data is fetched via the HTTP endpoint `/users/{id}`

**The Event Gateway**
- receives the `userCreated` event
- invokes the subscribing function `sendWelcomeEmail`

**Email service**
- A welcome email is sent via the `sendWelcomeEmail` function
- The service exposes a HTTP endpoint `/email`

## Local Experience with Framework

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

## Cloud Experience

In this case, you will be deploying your services to the cloud provider of choice, and run an independent instance of the Event Gateway. This is sort of the On-Prem experience for Event Gateway, with deployments on the cloud.

### Event Gateway

Run a local copy of event gateway as per [instructions](https://github.com/serverless/event-gateway#running-locally).

### Backend Services

Set up the [Users service](./services/users-services/README.md) and the [Email service](./services/email-services/README.md).

### Frontend UI

Set up the [frontend UI](./frontend/README.md).

## Application Execution

The following steps simulate performing actions via an UI.

### Register an User

**Note**: Based on the deployments, replace the endpoint in the following calls.

```
curl -X POST \
  https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/prod/users \
  -H 'content-type: application/json' \
  -d '{"user":{"name":"Your Name", "email":"your@email.com"}}'
```

Keep an eye on the event gateway logs. You should see the `userCreated` event being received and the corresponding function being called.

**If all goes well, you should get a welcome email.**
