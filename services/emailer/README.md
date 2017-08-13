# Email Service

Simple email notification service.

## Getting Started

**Pre-requisite**: Mailgun account is created and at least one email address is authorized to send emails to.

1. Clone the repository
2. Prepare for deployment

```
$ cd event-gateway-example/services/email-service
$ cp config.prod.example.json config.prod.json

// Open up the config.prod.json and add the Mailgun API keys

$ npm install
$ sls run
```
