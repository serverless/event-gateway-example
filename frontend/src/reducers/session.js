export default (state = null, action) => {
  switch (action.type) {
    case 'REGISTER_USER_SUCCESS':
      return action.data.session;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};
