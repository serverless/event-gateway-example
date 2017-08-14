'use strict';

const path = require('path');
const BigQuery = require('@google-cloud/bigquery');
const CREDENTIALS_FILE = process.env.CREDENTIALS_FILE
const PROJECT_ID = process.env.PROJECT_ID
const DATASET_ID = process.env.DATASET_ID
const TABLE_ID = process.env.TABLE_ID

const bigquery = BigQuery({
  keyFilename: path.join(__dirname, CREDENTIALS_FILE),
  projectId: PROJECT_ID
});

// Inserts data into a table
function insertRows(rows) {
  bigquery
    .dataset(DATASET_ID)
    .table(TABLE_ID)
    .insert(rows)
    .then((resp) => {
      if (resp.insertErrors && resp.insertErrors.length > 0) {
        //console.log('Insert errors:');
        resp.insertErrors.forEach((err) => console.error(err));
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      //console.error('ERROR:', JSON.stringify(err));
    });
};

exports.recordEvents= (event, callback) => {

  // We're not storing dataType in BigQuery because we don't care about it.
  // We need to serialize the `data` object to a string before storing, since it's arbitrary JSON.
  // BigQuery timestamps are in seconds, so need to adjust the `receivedAt` field.
  var row = event;
  delete row.dataType;
  row.data = JSON.stringify(row.data);
  row.receivedAt = row.receivedAt / 1000.0;
  const rows = [row]

  insertRows(rows);
  callback(null, {
    message: 'Inserted row to BigQuery.',
  });
};
