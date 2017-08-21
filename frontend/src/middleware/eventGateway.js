import fdk from '@serverless/fdk/dist/fdk.min.js';

const eventGateway = fdk.eventGateway({
  url: 'http://localhost:4000'
});

export default store => next => action => {
  let event = {};

  switch (action.type) {
    case 'USER_ACTIVITY_CLICKED':
      event.event = 'user.clicked';
      event.data = action.data;
      break;
    default:
      event = null;
      break;
  }

  if (event) {
    eventGateway
      .emit(event)
      .then(() => {
        console.info(`Emitted ${event.event}`);
        console.log(event.data);
      })
      .catch(() => {
        console.error(`Failed to emit ${event.event}`);
        console.log(event.data);
      });
  }

  return next(action);
};
