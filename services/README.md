## Manual Testing

### Register Functions with the Event Gateway

**Note**: Based on the deployments, replace the `arn` attribute in the following calls.

```
// register registerUser
curl -X POST http://localhost:4001/v1/functions \
  -H 'content-type: application/json' \
  -d '{
	"functionId": "registerUser",
	"provider": {
		"type": "awslambda",
		"arn": "arn:aws:lambda:us-east-1:XXXXXXXXXXX:function:users-service-prod-registerUser",
		"region": "us-east-1"
	}
}'
```

```
// register getUser
curl -X POST http://localhost:4001/v1/functions \
  -H 'content-type: application/json' \
  -d '{
	"functionId": "getUser",
	"provider": {
		"type": "awslambda",
		"arn": "arn:aws:lambda:us-east-1:XXXXXXXXXXX:function:users-service-prod-getUser",
		"region": "us-east-1"
	}
}'
```

```
// register sendWelcomeEmail
curl -X POST http://localhost:4001/v1/functions \
  -H 'content-type: application/json' \
  -d '{
	"functionId": "sendWelcomeEmail",
	"provider": {
		"type": "awslambda",
		"arn": "arn:aws:lambda:us-east-1:XXXXXXXXXXX:function:eg-email-service-prod-sendWelcomeEmail",
		"region": "us-east-1"
	}
}'
```

### Subscribe to Events

```
// subscribe to 'user.created' event
curl -X POST http://localhost:4001/v1/subscriptions \
  -H 'content-type: application/json' \
  -d '{
	"functionId": "sendWelcomeEmail",
	"event": "user.created"
}'
```
