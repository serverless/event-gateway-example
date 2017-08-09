# Event Gateway Example

## Goals

Create an application with a simple user registration workflow, showcasing Event Gateway as the central hub and broker, orchestrating event flows across decoupled services. The  services can be deployed locally or onto a cloud provider. 

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

## Getting Started

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

## Immediate Future

Ideally, we want to run the above application using the `serverless run` command. Currently, I found no way to run an application with multiple services with it. 

The experience with `serverless run` will be awesome. There will be no need for setting up anything under the Getting Started section. 

The `serverless run` command will:

- Start a local copy of the Event Gateway
- Start a local copy of the Local Emulator
- Services will be automatically *deployed* to the Local Emulator
- All of the functions that have event mappings will be *registered* automatically.

The application only needs to *subscribe* to appropriate events as per need.
