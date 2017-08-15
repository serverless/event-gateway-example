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
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Status code != 200');
    })
    .then(response => {
      sessionStorage.setItem('session', response.session);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        data: {
          email,
          session: response.session
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
