export const LOGOUT = 'LOGOUT';

export const logout = () => (dispatch, getState) => {
  sessionStorage.removeItem('session');
  dispatch({
    type: LOGOUT,
    data: {
      session: getState().session
    }
  });
};
