const initialState = {
  userName: '',
  userLogin: '',
  userPass: '',
  userEmail: '',
  error: null,
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get/registration/name':
      return {
        ...state,
        userName: action.payload,
      };
    case 'get/registration/login':
      return {
        ...state,
        userLogin: action.payload,
      };
    case 'get/registration/pass':
      return {
        ...state,
        userPass: action.payload,
      };
    case 'get/registration/mail':
      return {
        ...state,
        userEmail: action.payload,
      };
    case 'auth/successes':
      return {
        ...state,
        userName: '',
        userLogin: '',
        userPass: '',
        userEmail: '',
      };
    case 'new/user/reg/error':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export const userName = (name) => {
  // получение имени пользователя при регистрации
  return (dispatch) => {
    dispatch({
      // принимается в registrationReducer
      type: 'get/registration/name',
      payload: name,
    });
  };
};
export const userLogin = (login) => {
  // получение логина пользователя при регистрации
  return (dispatch) => {
    dispatch({
      // принимается в registrationReducer
      type: 'get/registration/login',
      payload: login,
    });
  };
};
export const userPass = (pass) => {
  // получение пароля пользователя при регистрации
  return (dispatch) => {
    dispatch({
      // принимается в registrationReducer
      type: 'get/registration/pass',
      payload: pass,
    });
  };
};
export const userMail = (mail) => {
  // получение почты пользователя при регистрации
  return (dispatch) => {
    dispatch({
      // принимается в registrationReducer
      type: 'get/registration/mail',
      payload: mail,
    });
  };
};
export const regError = (error) => {
  return (dispatch) => {
    dispatch({
      type: 'new/user/reg/error',
      error: error,
    });
  };
};

export const createDialog = () => {
  // создание диалогов пользователя
  return (dispatch) => {
    fetch(`/dialogs`, {
      method: 'POST',
      body: JSON.stringify({
        dialog: [],
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: 'create/user/dialogs/successes',
          payload: json,
        }),
      );
  };
};

export const registrationNewUser = (name, login, pass, email, history) => {
  // регистрация новго пользователя
  return (dispatch) => {
    dispatch({ type: 'new/user/reg/start' });

    fetch(`/users`, {
      method: 'POST',
      body: JSON.stringify({
        userName: name,
        login: login,
        password: pass,
        email: email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          dispatch({ type: 'new/user/reg/error', error: json.error });
        } else {
          history.push('/profile');
          dispatch({ type: 'auth/successes', payload: json }); // принимаем в userAuthReducer и registrationReducer
        }
      });
  };
};
