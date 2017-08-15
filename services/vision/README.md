# Vision Service

Service to analyze new user Gravatars with the Google Vision API.

## Getting Started

Read the section below on getting Google credentials. 

Set your `API_KEY` and `PROJECT_ID` in the `config.json` file.

Then:

```
$ npm install
$ sls run
```

## Google credentials.

You need to get an API key from a project that has the Cloud Vision API enabled.

1. Go to the [Cloud Vision API](https://console.cloud.google.com/apis/api/vision.googleapis.com/overview) section of the GCP console. Hit "Enable" to enable Cloud Vision for your project.

2. Go to the [Credentials view](https://console.cloud.google.com/apis/credentials) in the GCP Console. Hit "Create credentials" and choose "API key". Copy and paste the key into `config.json`.
