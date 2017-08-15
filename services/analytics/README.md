# Analytics Service

Analytics service to store events to BigQuery

## Getting Started

Read the section below on getting Google credentials. 

Set your PROJECT_ID in the `config.json` file.

Then:

```
$ npm install
$ node setup.js
$ sls run
```

## Google credentials.

You need to get a JSON key file with access to BigQuery.

1. Go to the Google APIs [Credentials console](https://console.developers.google.com/projectselector/apis/credentials). Select your project.

1. Go to the [Google APIs Library](https://console.developers.google.com/apis/library) page, and click on the [BiqQuery API](https://console.developers.google.com/apis/api/bigquery-json.googleapis.com/overview) link to make sure the API is enabled for your project.

1. Click `Create Credentials` and choose `Service account key`.

1. In the Service Account dropdown, choose `New service account`. Give it a name. In the Role box, go to BigQuery and select BigQuery Admin.

1. Use a JSON key type and hit 'Create'. It will download a JSON file to your computer. Move it to this directory as the file name `credentials.json`. 

## Using BigQuery

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
