const initialState = {
  item: [],
  dialogsLoading: false,
};

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get/dialogs/loading':
      return {
        ...state,
        dialogsLoading: true,
      };
    case 'get/dialogs/successes':
      return {
        ...state,
        item: action.payload,
        dialogsLoading: false,
      };
    case 'make/new/dialog/successes':
      return {
        ...state,
        item: [action.payload, ...state.item],
      };

    default:
      return state;
  }
};

//получаем диалоги пользователя при переходе на страницу messenger
export const getDialogs = (userId) => {
  return (dispatch) => {
    dispatch({ type: 'get/dialogs/loading' });
    fetch(`/dialogs`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((dialogs) => {
        dispatch({
          type: 'get/dialogs/successes',
          payload: dialogs,
        });
      });
  };
};

export const makeDialogUser = (userId, opponentName, opponentId) => {
  //создание диалога между пользователями
  return (dispatch) => {
    dispatch({ type: 'parse/message/loading' });
    fetch(`/dialogs`, {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        userOpponentName: opponentName,
        userOpponentId: opponentId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((dialog) => {
        dispatch({
          type: 'make/new/dialog/successes',
          payload: dialog,
        });
      });
  };
};

export const makeDialogOpponent = (userId, userName, opponentId) => {
  //создание диалога между пользователями у аппонента
  return (dispatch) => {
    dispatch({ type: 'parse/message/loading' });
    fetch(`/dialogs`, {
      method: 'POST',
      body: JSON.stringify({
        userId: opponentId,
        userOpponentName: userName,
        userOpponentId: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };
};
