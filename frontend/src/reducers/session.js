export default (state = null, action) => {
  switch (action.type) {
    case 'REGISTER_USER_SUCCESS':
      return action.session;
    default:
      return state;
  }
};
