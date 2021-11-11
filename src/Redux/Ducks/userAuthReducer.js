const initialState = {
  item: [], //приходят данные с сервера если авторизация прошла успешно
  authLoading: false, //польлзователь начал авторизацию или нет
  logInLogOut: false, //проверка пользователь авторизован или нет
  error: null, //ошибка авторизации. приходит с сервера
  window_open_and_close: false, //отвечает за открытие и закрытие модального окна авторизации
};

export const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'log_in_&_out/window/open': //открывает модальное окно
      return {
        ...state,
        window_open_and_close: true,
      };
    case 'log_in_&_out/window/close': //закрывает модальное окно
      return {
        ...state,
        window_open_and_close: false,
        error: null,
      };
    case 'auth/loading': //пользователь ввел логин и пароль и отправил запрос на сервер для авторизации
      return {
        ...state,
        authLoading: true,
      };
    case 'auth/successes': //авторизация прошла успешно
      return {
        ...state,
        item: action.payload,
        error: null,
        authLoading: false,
        logInLogOut: true,
        window_open_and_close: false,
      };
    case 'auth/error': //авторизация прошла неудачно
      return {
        ...state,
        error: action.payload,
      };
    case 'log/out': //Выход из аккаунта
      return {
        ...state,
        item: [],
        logInLogOut: false,
      };

    default:
      return state;
  }
};

export const windowOpen = () => {
  //открываем модальное окно авторизации
  return (dispatch) => {
    // отправили в userAuthReducer
    dispatch({ type: 'log_in_&_out/window/open' });
  };
};

export const windowClose = () => {
  //закрываем модальное окно авторизации
  return (dispatch) => {
    // отправили в userAuthReducer
    dispatch({ type: 'log_in_&_out/window/close' });
  };
};

export const logOut = () => {
  //выходит из аккаунта
  return (dispatch) => {
    // отправили в userAuthReducer
    dispatch({ type: 'log/out' });
  };
};
export const logIn = (login, password, history) => {
  //авторизация пользователя
  return (dispatch) => {
    dispatch({ type: 'auth/loading' });
    fetch('/auth', {
      //отправляем логин и пароль на сервер что бы получить пользователя если они верны
      method: 'POST',
      body: JSON.stringify({
        login: login,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.error) {
          history.push('/profile');
          dispatch({
            type: 'auth/successes',
            payload: json,
          });
        } else {
          dispatch({
            type: 'auth/error',
            payload: json.error,
          });
        }
      });
  };
};
