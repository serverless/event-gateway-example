export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const register = email => (dispatch, getState) => {
  dispatch({
    type: REGISTER_USER,
    data: {
      email
    }
  });
  fetch('http://localhost:4000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(() => {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        data: {
          email
        }
      });
    })
    .catch(() => {
      dispatch({
        type: REGISTER_USER_FAILURE,
        data: {
          email
        }
      });
    });
};
