const initialState = {
 item: [],
 postsLoading: false,
};

export const postsReducer = (state = initialState, action) => {
 switch (action.type) {
  case 'get/posts/start':
   return {
    postsLoading: true,
   };
  case 'get/posts/successes':
   return {
    postsLoading: false,
    item: action.payload,
   };
  case 'add/new/post/successes':
   return {
    ...state,
    item: [...state.item, action.payload],
   };
  case 'delete/post/successes':
   return {
    ...state,
    item: state.item.filter((post) => post.id !== action.payload),
   };
  case 'approved/post/successes':
   return {
    ...state,
    item: state.item.map((post) =>
      post.id === action.payload.id ? action.payload : post,
    ),
   };

  default:
   return state;
 }
};

export const getPosts = () => {
 //получение постов страницы Feed
 return (dispatch) => {
  dispatch({ type: 'get/posts/start' });

  fetch(`/posts`)
    .then((res) => res.json())
    .then((posts) => {
     dispatch({
      // принимается в postsReducer
      type: 'get/posts/successes',
      payload: posts,
     });
    });
 };
};

export const addNewPostWindowOpenClose = () => {
 // открывает и закрывает панель добавления поста на странице feed
 return (dispatch) => {
  dispatch({
   // принимается в addPostReducer
   type: 'add/new/post/window/open/ore/close',
  });
 };
};
export const addNewPostWindowClose = () => {
 //закрывает панель добавления поста на странице feed
 return (dispatch) => {
  dispatch({
   // принимается в addPostReducer
   type: 'add/new/post/window/close',
  });
 };
};
export const addTitleNewPost = (title) => {
 //отправляет заголовок новго поста в редюсер
 return (dispatch) => {
  dispatch({
   // принимается в addPostReducer
   type: 'add/title/new/post',
   payload: title,
  });
 };
};
export const addTextNewPost = (text) => {
 //отправляет текст новго поста в редюсер
 return (dispatch) => {
  dispatch({
   // принимается в addPostReducer
   type: 'add/text/new/post',
   payload: text,
  });
 };
};

export const addNewPost = (title, text, userName, userId) => {
 // добавление нового поста из компонента AddNewPost
 return (dispatch) => {
  fetch(`/posts`, {
   method: 'POST',
   body: JSON.stringify({
    title: title,
    text: text,
    author: userName,
    userId: userId,
    approved: false,
   }),
   headers: {
    'Content-type': 'application/json; charset=UTF-8',
   },
  })
    .then((response) => response.json())
    .then((json) =>
      dispatch({
       // принимается в postsReducer
       type: 'add/new/post/successes',
       payload: json,
      }),
    );
 };
};

export const adminDeletePost = (id) => {
 //удаление админом неодобренного поста передается айди на сервер
 return (dispatch) => {
  fetch(`/posts/${id}`, {
   method: 'DELETE',
  })
    .then((res) => res.json())
    .then(() => {
     dispatch({
      // принимается в postsReducer
      type: 'delete/post/successes',
      payload: id,
     });
    });
 };
};

export const adminApprovedPost = (id) => {
 //одобрение админом неодобренного поста передается айди на сервер
 return (dispatch) => {
  fetch(`/posts/${id}`, {
   method: 'PATCH',
   body: JSON.stringify({
    approved: true,
   }),
   headers: {
    'Content-type': 'application/json; charset=UTF-8',
   },
  })
    .then((res) => res.json())
    .then((json) => {
     dispatch({
      // принимается в postsReducer
      type: 'approved/post/successes',
      payload: json,
     });
    });
 };
};
