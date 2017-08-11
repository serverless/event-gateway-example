export default (state = null, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        email: action.data.email
      };
    default:
      return state;
  }
};
