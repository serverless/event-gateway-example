'use strict';

const path = require('path');
const BigQuery = require('@google-cloud/bigquery');
const config = require('./config.json');
const CREDENTIALS_FILE = config.CREDENTIALS_FILE;
const PROJECT_ID = config.PROJECT_ID;
const DATASET_ID = config.DATASET_ID;
const TABLE_ID = config.TABLE_ID;

const bigquery = BigQuery({
  keyFilename: path.join(__dirname, CREDENTIALS_FILE),
  projectId: PROJECT_ID
});

const dataset = bigquery.dataset(DATASET_ID);
const opts = {
  schema: 'event:string,id:string,receivedAt:timestamp,data:string',
  autoCreate: true
}

// Get a dataset if it exists or create it if it doesn't
dataset.get(opts, function(err, dataset, apiResponse) {
  if (err) {
    console.log('Error creating dataset');
    throw new Error(err);
  } else {
    console.log('Dataset ' + DATASET_ID + ' created successfully.');

    // make sure to call createTable only on success
    dataset.createTable(TABLE_ID, opts, function(err, table, apiResponse) {
      if (err) {
        if (err.errors.length === 1 && err.errors[0].reason == 'duplicate') {
          console.log('Table ' + TABLE_ID + ' already exists.');
        } else {
          console.log('Error creating table');
          throw new Error(err);
        }
      } else {
        console.log('Table ' + TABLE_ID + ' created successfully.');
      }
    })
        
  }
})

