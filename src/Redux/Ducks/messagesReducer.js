const initialState = {
  item: [],
  messagesLoading: false,
  newMessageLoading: false,
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get/user/messages/start':
      return {
        ...state,
        messagesLoading: true,
      };
    case 'get/user/messages/successes':
      return {
        ...state,
        item: action.payload,
        messagesLoading: false,
      };
    case 'parse/message/loading':
      return {
        ...state,
        newMessageLoading: true,
      };
    case 'parse/message/successes':
      return {
        ...state,
        item: [...state.item, action.payload],
        newMessageLoading: false,
      };
    default:
      return state;
  }
};

//получение сообщений определенного диалога педаем на сервер айди авторизованного пользователя userId и того на чей диалог кликнули opponentId
export const getMessages = (userName, opponentName) => {
  return (dispatch) => {
    fetch(`/dialog`, {
      method: 'POST',
      body: JSON.stringify({
        userName: userName,
        opponentName: opponentName,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((messages) => {
        dispatch({
          type: 'get/user/messages/successes',
          payload: messages,
        });
      });
  };
};

//отпарвка сообщения получаем текст сообщения, кто пишет и кому пишет и передаем это все на сервер
export const addNewMessage = (message, userName, opponentName) => {
  return (dispatch) => {
    dispatch({ type: 'parse/message/loading' });
    fetch(`/messages`, {
      method: 'POST',
      body: JSON.stringify({
        userName: userName,
        opponentName: opponentName,
        message: message,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((message) => {
        dispatch({
          type: 'parse/message/successes',
          payload: message,
        });
      });
  };
};
