const initialState = {
  item: [],
  usersLoading: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get/users/start':
      return {
        ...state,
        usersLoading: true,
      };
    case 'get/users/successes':
      return {
        ...state,
        item: action.payload,
        usersLoading: false,
      };

    default:
      return state;
  }
};

export const getUsers = () => {
  //получение пользователей для страницы пользователи
  return (dispatch) => {
    dispatch({ type: 'get/users/start' });

    fetch(`/users`)
      .then((res) => res.json())
      .then((users) => {
        dispatch({
          type: 'get/users/successes',
          payload: users,
        });
      });
  };
};
