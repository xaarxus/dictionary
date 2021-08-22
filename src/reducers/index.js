const initState = {
  user: {},
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, user };
    }
    case 'LOGOUT': {
      return { ...state, user: {} };
    }
    default:
      return state;
  }
};

export default reducers;
