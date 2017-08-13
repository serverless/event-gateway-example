export const USER_ACTIVITY_LOGOUT = 'USER_ACTIVITY_LOGOUT';

export const logout = () => (dispatch, getState) => {
  sessionStorage.removeItem('session');
  dispatch({
    type: USER_ACTIVITY_LOGOUT,
    data: {
      session: getState().session
    }
  });
};
