export const USER_ACTIVITY = 'user.activity';

export const logActivity = section => ({
  type: USER_ACTIVITY,
  data: {
    section
  },
  emit: true
});
