export const USER_ACTIVITY_CLICKED = 'USER_ACTIVITY_CLICKED';

export const click = target => (dispatch, getState) => {
  const session = getState().session;
  if (session) {
    dispatch({
      type: USER_ACTIVITY_CLICKED,
      data: {
        target,
        session
      }
    });
  }
};
