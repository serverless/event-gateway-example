export const USER_ACTIVITY = 'user.activity';

export const logActivity = section => (dispatch, getState) => {
  const session = getState().session;
  if (session) {
    dispatch({
      type: USER_ACTIVITY,
      data: {
        section,
        session
      },
      emit: true
    });
  }
};
