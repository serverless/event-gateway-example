import fdk from '@serverless/fdk';

const eventGateway = fdk.eventGateway({
  url: 'http://localhost:4000'
});

export default store => next => action => {
  if (action.emit) {
    eventGateway
      .emit({
        event: action.type,
        data: action.data
      })
      .then(() => {
        console.info(`Emitted ${action.type}`);
        console.log(action.data);
      })
      .catch(() => {
        console.error(`Failed to emit ${action.type}`);
        console.log(action.data);
      });
  }
  let result = next(action);
  return result;
};
