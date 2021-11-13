const initialState = {
  titleNewPost: '',
  textNewPost: '',
  addNewPostWindowOpenAndClose: false,
};

export const addPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add/new/post/window/open/ore/close':
      return {
        ...state,
        addNewPostWindowOpenAndClose: !state.addNewPostWindowOpenAndClose,
      };
    case 'add/new/post/window/close':
      return {
        ...state,
        addNewPostWindowOpenAndClose: false,
      };
    case 'add/title/new/post':
      return {
        ...state,
        titleNewPost: action.payload,
      };
    case 'add/text/new/post':
      return {
        ...state,
        textNewPost: action.payload,
      };
    default:
      return state;
  }
};
